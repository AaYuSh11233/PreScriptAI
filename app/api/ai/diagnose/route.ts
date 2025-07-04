import { type NextRequest, NextResponse } from "next/server"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { patientData } = body

    const prompt = `
As an experienced medical doctor, analyze the following patient information and provide a comprehensive medical assessment:

Patient Information:
- Name: ${patientData.name}
- Age: ${patientData.age}
- Gender: ${patientData.gender}
- Height: ${patientData.height}m
- Weight: ${patientData.weight}kg
- BMI: ${patientData.bmi}
- Chronic Diseases: ${patientData.chronicDisease || "None"}
- Current Medications: ${patientData.medications || "None"}
- Current Symptoms: ${patientData.symptoms}
- Additional Notes: ${patientData.remarks || "None"}

Please provide:
1. PRIMARY DIAGNOSIS (most likely condition based on symptoms)
2. DIFFERENTIAL DIAGNOSES (2-3 alternative possibilities)
3. RECOMMENDED MEDICATIONS with specific dosages, frequency, and duration
4. NECESSARY LAB TESTS for confirmation
5. PRECAUTIONS and warnings
6. FOLLOW-UP recommendations
7. LIFESTYLE MODIFICATIONS if applicable

Format the response in a clear, professional medical format suitable for a prescription.
Be specific with medication names (generic), dosages, and instructions.
Consider drug interactions with existing medications.
Provide confidence level for your primary diagnosis.
`

    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": GEMINI_API_KEY!,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    const aiResponse = data.candidates[0].content.parts[0].text

    // Parse the AI response into structured format
    const structuredResponse = {
      diagnosis: extractSection(aiResponse, "PRIMARY DIAGNOSIS"),
      differentialDiagnoses: extractSection(aiResponse, "DIFFERENTIAL DIAGNOSES"),
      medications: extractSection(aiResponse, "RECOMMENDED MEDICATIONS"),
      labTests: extractSection(aiResponse, "NECESSARY LAB TESTS"),
      precautions: extractSection(aiResponse, "PRECAUTIONS"),
      followUp: extractSection(aiResponse, "FOLLOW-UP"),
      lifestyle: extractSection(aiResponse, "LIFESTYLE MODIFICATIONS"),
      fullResponse: aiResponse,
      confidence: extractConfidence(aiResponse),
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(structuredResponse)
  } catch (error) {
    console.error("AI Diagnosis Error:", error)
    return NextResponse.json({ error: "Failed to generate diagnosis" }, { status: 500 })
  }
}

function extractSection(text: string, sectionName: string): string {
  const regex = new RegExp(`${sectionName}[:\\s]*([\\s\\S]*?)(?=\\n\\d+\\.|\\n[A-Z][A-Z\\s]+:|$)`, "i")
  const match = text.match(regex)
  return match ? match[1].trim() : ""
}

function extractConfidence(text: string): number {
  const confidenceMatch = text.match(/confidence[:\s]*(\d+)%/i)
  return confidenceMatch ? Number.parseInt(confidenceMatch[1]) : 85
}

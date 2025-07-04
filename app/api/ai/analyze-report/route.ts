import { type NextRequest, NextResponse } from "next/server"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const reportType = formData.get("reportType") as string
    const patientInfo = formData.get("patientInfo") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const base64 = Buffer.from(bytes).toString("base64")

    const prompt = `
As a medical expert, analyze this ${reportType} report and provide a comprehensive interpretation:

Patient Context: ${patientInfo}

Please provide:
1. REPORT SUMMARY - Key findings and values
2. ABNORMAL FINDINGS - Highlight any values outside normal ranges
3. CLINICAL SIGNIFICANCE - What these findings mean for the patient
4. RECOMMENDATIONS - Next steps, additional tests, or treatments
5. URGENCY LEVEL - How quickly action should be taken
6. FOLLOW-UP - When to recheck or monitor

Be specific about normal ranges, explain medical terminology in simple terms, and provide actionable insights.
If this is a lab report, include reference ranges. If imaging, describe anatomical findings clearly.
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
              {
                inline_data: {
                  mime_type: file.type,
                  data: base64,
                },
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 32,
          topP: 0.9,
          maxOutputTokens: 2048,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    const aiResponse = data.candidates[0].content.parts[0].text

    const structuredResponse = {
      summary: extractSection(aiResponse, "REPORT SUMMARY"),
      abnormalFindings: extractSection(aiResponse, "ABNORMAL FINDINGS"),
      clinicalSignificance: extractSection(aiResponse, "CLINICAL SIGNIFICANCE"),
      recommendations: extractSection(aiResponse, "RECOMMENDATIONS"),
      urgencyLevel: extractSection(aiResponse, "URGENCY LEVEL"),
      followUp: extractSection(aiResponse, "FOLLOW-UP"),
      fullAnalysis: aiResponse,
      reportType,
      fileName: file.name,
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(structuredResponse)
  } catch (error) {
    console.error("Report Analysis Error:", error)
    return NextResponse.json({ error: "Failed to analyze report" }, { status: 500 })
  }
}

function extractSection(text: string, sectionName: string): string {
  const regex = new RegExp(`${sectionName}[:\\s]*([\\s\\S]*?)(?=\\n\\d+\\.|\\n[A-Z][A-Z\\s]+:|$)`, "i")
  const match = text.match(regex)
  return match ? match[1].trim() : ""
}

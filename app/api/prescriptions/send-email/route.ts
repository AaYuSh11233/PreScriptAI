import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const { prescription, patientEmail, pharmacyEmail, doctorInfo } = await request.json()

    // Create transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Email template for patient
    const patientEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .prescription-box { background: #f8f9fa; border-left: 4px solid #007bff; padding: 15px; margin: 15px 0; }
            .medication { background: white; border: 1px solid #dee2e6; border-radius: 5px; padding: 10px; margin: 10px 0; }
            .footer { background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🏥 PrescriptAI - Your Prescription</h1>
        </div>
        <div class="content">
            <h2>Dear ${prescription.patientInfo.name},</h2>
            <p>Your prescription has been generated and reviewed by Dr. ${doctorInfo.name}.</p>
            
            <div class="prescription-box">
                <h3>📋 Diagnosis</h3>
                <p><strong>${prescription.diagnosis}</strong></p>
            </div>

            <h3>💊 Prescribed Medications</h3>
            ${prescription.medications
              .map(
                (med: any) => `
                <div class="medication">
                    <h4>${med.name}</h4>
                    <p><strong>Dosage:</strong> ${med.dosage}</p>
                    <p><strong>Frequency:</strong> ${med.frequency}</p>
                    <p><strong>Duration:</strong> ${med.duration}</p>
                    <p><strong>Instructions:</strong> ${med.instructions}</p>
                </div>
            `,
              )
              .join("")}

            <div class="prescription-box">
                <h3>⚠️ Important Precautions</h3>
                <ul>
                    ${prescription.precautions.map((precaution: string) => `<li>${precaution}</li>`).join("")}
                </ul>
            </div>

            <div class="prescription-box">
                <h3>🔬 Recommended Lab Tests</h3>
                <ul>
                    ${prescription.labTests.map((test: string) => `<li>${test}</li>`).join("")}
                </ul>
            </div>

            <p><strong>Follow-up:</strong> ${prescription.followUp}</p>
            
            <p>If you have any questions, please contact your healthcare provider.</p>
        </div>
        <div class="footer">
            <p>This prescription was generated using PrescriptAI - Advanced Medical AI Platform</p>
            <p>© 2024 PrescriptAI. All rights reserved.</p>
        </div>
    </body>
    </html>
    `

    // Email template for pharmacy
    const pharmacyEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: #28a745; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .prescription-details { background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 5px; padding: 15px; margin: 15px 0; }
            .medication { background: white; border: 1px solid #dee2e6; border-radius: 5px; padding: 10px; margin: 10px 0; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🏪 New Prescription - PrescriptAI</h1>
        </div>
        <div class="content">
            <h2>New Prescription Order</h2>
            
            <div class="prescription-details">
                <h3>Patient Information</h3>
                <p><strong>Name:</strong> ${prescription.patientInfo.name}</p>
                <p><strong>Age:</strong> ${prescription.patientInfo.age}</p>
                <p><strong>Gender:</strong> ${prescription.patientInfo.gender}</p>
            </div>

            <div class="prescription-details">
                <h3>Prescribing Doctor</h3>
                <p><strong>Dr. ${doctorInfo.name}</strong></p>
                <p>License: ${doctorInfo.license}</p>
                <p>Specialty: ${doctorInfo.specialty}</p>
            </div>

            <h3>💊 Medications to Dispense</h3>
            ${prescription.medications
              .map(
                (med: any, index: number) => `
                <div class="medication">
                    <h4>${index + 1}. ${med.name}</h4>
                    <p><strong>Dosage:</strong> ${med.dosage}</p>
                    <p><strong>Frequency:</strong> ${med.frequency}</p>
                    <p><strong>Duration:</strong> ${med.duration}</p>
                    <p><strong>Instructions:</strong> ${med.instructions}</p>
                </div>
            `,
              )
              .join("")}

            <div class="prescription-details">
                <h3>📋 Diagnosis</h3>
                <p>${prescription.diagnosis}</p>
            </div>

            <p><strong>Prescription Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Prescription ID:</strong> RX-${Date.now()}</p>
        </div>
    </body>
    </html>
    `

    // Send email to patient
    if (patientEmail) {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: patientEmail,
        subject: `Your Prescription from Dr. ${doctorInfo.name} - PrescriptAI`,
        html: patientEmailHtml,
      })
    }

    // Send email to pharmacy
    if (pharmacyEmail) {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: pharmacyEmail,
        subject: `New Prescription Order - ${prescription.patientInfo.name}`,
        html: pharmacyEmailHtml,
      })
    }

    return NextResponse.json({
      success: true,
      message: "Prescription sent successfully",
      sentTo: {
        patient: !!patientEmail,
        pharmacy: !!pharmacyEmail,
      },
    })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json({ error: "Failed to send prescription" }, { status: 500 })
  }
}

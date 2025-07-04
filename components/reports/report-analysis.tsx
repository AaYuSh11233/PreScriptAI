import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Clock, FileText } from "lucide-react"

interface ReportAnalysisProps {
  data: any
}

export function ReportAnalysis({ data }: ReportAnalysisProps) {
  if (!data) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <div className="text-center">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <div className="text-lg font-medium mb-2">No analysis yet</div>
          <div className="text-sm">Upload a medical report to see AI analysis results</div>
        </div>
      </div>
    )
  }

  const getUrgencyColor = (urgency: string) => {
    if (urgency.toLowerCase().includes("urgent") || urgency.toLowerCase().includes("immediate")) {
      return "bg-red-100 text-red-800 border-red-300"
    } else if (urgency.toLowerCase().includes("moderate")) {
      return "bg-yellow-100 text-yellow-800 border-yellow-300"
    } else {
      return "bg-green-100 text-green-800 border-green-300"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Analysis Results</h3>
          <p className="text-sm text-gray-500">Report: {data.fileName}</p>
        </div>
        <Badge className={getUrgencyColor(data.urgencyLevel)}>{data.urgencyLevel}</Badge>
      </div>

      {/* Summary */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-blue-600" />
            Report Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </CardContent>
      </Card>

      {/* Abnormal Findings */}
      {data.abnormalFindings && (
        <Card className="border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Abnormal Findings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-red-800 leading-relaxed">{data.abnormalFindings}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Clinical Significance */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-600" />
            Clinical Significance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{data.clinicalSignificance}</p>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-green-800 leading-relaxed">{data.recommendations}</p>
          </div>
        </CardContent>
      </Card>

      {/* Follow-up */}
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-600" />
            Follow-up Instructions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{data.followUp}</p>
        </CardContent>
      </Card>

      {/* Timestamp */}
      <div className="text-center text-sm text-gray-500 pt-4 border-t">
        Analysis completed on {new Date(data.timestamp).toLocaleString()}
      </div>
    </div>
  )
}

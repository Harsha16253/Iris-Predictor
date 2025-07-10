"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Flower, Sparkles } from "lucide-react"

interface PredictionResult {
  species: string
  confidence: number
  color: string
}

export default function IrisPredictor() {
  const [measurements, setMeasurements] = useState({
    sepalLength: "",
    sepalWidth: "",
    petalLength: "",
    petalWidth: "",
  })

  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setMeasurements((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const predictSpecies = (
    sepalLength: number,
    sepalWidth: number,
    petalLength: number,
    petalWidth: number,
  ): PredictionResult => {
    // Simple rule-based classification based on typical Iris characteristics
    if (petalLength < 2.5 && petalWidth < 1.0) {
      return {
        species: "Iris Setosa",
        confidence: 95,
        color: "bg-green-100 text-green-800 border-green-200",
      }
    } else if (petalLength < 5.0 && petalWidth < 1.8) {
      if (sepalLength < 6.0 && sepalWidth > 2.8) {
        return {
          species: "Iris Versicolor",
          confidence: 88,
          color: "bg-blue-100 text-blue-800 border-blue-200",
        }
      } else {
        return {
          species: "Iris Versicolor",
          confidence: 82,
          color: "bg-blue-100 text-blue-800 border-blue-200",
        }
      }
    } else {
      return {
        species: "Iris Virginica",
        confidence: 90,
        color: "bg-purple-100 text-purple-800 border-purple-200",
      }
    }
  }

  const handlePredict = async () => {
    const { sepalLength, sepalWidth, petalLength, petalWidth } = measurements

    // Validate inputs
    if (!sepalLength || !sepalWidth || !petalLength || !petalWidth) {
      alert("Please fill in all measurements")
      return
    }

    const sl = Number.parseFloat(sepalLength)
    const sw = Number.parseFloat(sepalWidth)
    const pl = Number.parseFloat(petalLength)
    const pw = Number.parseFloat(petalWidth)

    if (isNaN(sl) || isNaN(sw) || isNaN(pl) || isNaN(pw)) {
      alert("Please enter valid numbers")
      return
    }

    if (sl <= 0 || sw <= 0 || pl <= 0 || pw <= 0) {
      alert("Please enter positive values")
      return
    }

    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const result = predictSpecies(sl, sw, pl, pw)
    setPrediction(result)
    setIsLoading(false)
  }

  const resetForm = () => {
    setMeasurements({
      sepalLength: "",
      sepalWidth: "",
      petalLength: "",
      petalWidth: "",
    })
    setPrediction(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flower className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Iris Species Predictor</h1>
          </div>
          <p className="text-gray-600">Enter the flower measurements to predict the Iris species</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Flower Measurements
            </CardTitle>
            <CardDescription>Enter the measurements in centimeters (cm)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sepal-length">Sepal Length (cm)</Label>
                <Input
                  id="sepal-length"
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="e.g., 5.1"
                  value={measurements.sepalLength}
                  onChange={(e) => handleInputChange("sepalLength", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sepal-width">Sepal Width (cm)</Label>
                <Input
                  id="sepal-width"
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="e.g., 3.5"
                  value={measurements.sepalWidth}
                  onChange={(e) => handleInputChange("sepalWidth", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="petal-length">Petal Length (cm)</Label>
                <Input
                  id="petal-length"
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="e.g., 1.4"
                  value={measurements.petalLength}
                  onChange={(e) => handleInputChange("petalLength", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="petal-width">Petal Width (cm)</Label>
                <Input
                  id="petal-width"
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="e.g., 0.2"
                  value={measurements.petalWidth}
                  onChange={(e) => handleInputChange("petalWidth", e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handlePredict} disabled={isLoading} className="flex-1">
                {isLoading ? "Predicting..." : "Predict Species"}
              </Button>
              <Button variant="outline" onClick={resetForm} disabled={isLoading}>
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {prediction && (
          <Card className="border-2 border-dashed border-gray-200">
            <CardHeader>
              <CardTitle className="text-center">Prediction Result</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="space-y-2">
                <Badge variant="secondary" className={`text-lg px-4 py-2 ${prediction.color}`}>
                  {prediction.species}
                </Badge>
                <p className="text-sm text-gray-600">Confidence: {prediction.confidence}%</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 text-sm text-left">
                <h4 className="font-semibold mb-2">Input Summary:</h4>
                <div className="grid grid-cols-2 gap-2 text-gray-600">
                  <div>Sepal Length: {measurements.sepalLength} cm</div>
                  <div>Sepal Width: {measurements.sepalWidth} cm</div>
                  <div>Petal Length: {measurements.petalLength} cm</div>
                  <div>Petal Width: {measurements.petalWidth} cm</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>This predictor uses a rule-based classification system based on the famous Iris dataset.</p>
        </div>
      </div>
    </div>
  )
}

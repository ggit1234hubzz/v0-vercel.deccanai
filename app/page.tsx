import { Cloud, CloudDrizzle, CloudRain, CloudSnow, Droplets, Sun, Thermometer } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function WeatherPage() {
  // Static weather data
  const currentWeather = {
    location: "San Francisco, CA",
    temperature: 68,
    feelsLike: 70,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 8,
    windDirection: "NW",
    precipitation: 0,
    lastUpdated: "Today, 2:00 PM",
  }

  const forecast = [
    {
      day: "Today",
      condition: "Partly Cloudy",
      high: 72,
      low: 58,
      precipitation: 0,
      icon: <Cloud className="h-8 w-8 text-gray-500" />,
    },
    {
      day: "Tomorrow",
      condition: "Sunny",
      high: 75,
      low: 60,
      precipitation: 0,
      icon: <Sun className="h-8 w-8 text-yellow-500" />,
    },
    {
      day: "Wednesday",
      condition: "Rain",
      high: 68,
      low: 57,
      precipitation: 70,
      icon: <CloudRain className="h-8 w-8 text-blue-500" />,
    },
    {
      day: "Thursday",
      condition: "Drizzle",
      high: 65,
      low: 55,
      precipitation: 30,
      icon: <CloudDrizzle className="h-8 w-8 text-blue-400" />,
    },
    {
      day: "Friday",
      condition: "Sunny",
      high: 70,
      low: 58,
      precipitation: 0,
      icon: <Sun className="h-8 w-8 text-yellow-500" />,
    },
  ]

  // Function to get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-16 w-16 text-yellow-500" />
      case "rain":
        return <CloudRain className="h-16 w-16 text-blue-500" />
      case "drizzle":
        return <CloudDrizzle className="h-16 w-16 text-blue-400" />
      case "snow":
        return <CloudSnow className="h-16 w-16 text-blue-200" />
      case "partly cloudy":
      default:
        return <Cloud className="h-16 w-16 text-gray-500" />
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">Weather Information</h1>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Current Weather Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{currentWeather.location}</span>
              <span className="text-sm font-normal text-muted-foreground">
                Last updated: {currentWeather.lastUpdated}
              </span>
            </CardTitle>
            <CardDescription>Current Conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-4">
                {getWeatherIcon(currentWeather.condition)}
                <div className="text-5xl font-bold">{currentWeather.temperature}°F</div>
              </div>
              <div className="text-xl">{currentWeather.condition}</div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <div className="flex items-center gap-1">
                  <Thermometer className="h-4 w-4" />
                  <span>Feels like: {currentWeather.feelsLike}°F</span>
                </div>
                <div className="flex items-center gap-1">
                  <Droplets className="h-4 w-4" />
                  <span>Humidity: {currentWeather.humidity}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
                  </svg>
                  <span>
                    Wind: {currentWeather.windSpeed} mph {currentWeather.windDirection}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <CloudRain className="h-4 w-4" />
                  <span>Precipitation: {currentWeather.precipitation}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hourly Forecast Card */}
        <Card>
          <CardHeader>
            <CardTitle>Hourly</CardTitle>
            <CardDescription>Next 6 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              {[
                { time: "3 PM", temp: 68, icon: <Cloud className="h-6 w-6 text-gray-500" /> },
                { time: "4 PM", temp: 67, icon: <Cloud className="h-6 w-6 text-gray-500" /> },
                { time: "5 PM", temp: 65, icon: <Cloud className="h-6 w-6 text-gray-500" /> },
                { time: "6 PM", temp: 63, icon: <Cloud className="h-6 w-6 text-gray-500" /> },
                { time: "7 PM", temp: 61, icon: <Cloud className="h-6 w-6 text-gray-500" /> },
                { time: "8 PM", temp: 60, icon: <Cloud className="h-6 w-6 text-gray-500" /> },
              ].map((hour, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-sm">{hour.time}</div>
                  {hour.icon}
                  <div className="mt-1 text-sm font-medium">{hour.temp}°</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 5-Day Forecast */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>5-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="daily" className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-2">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="daily">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
                {forecast.map((day, index) => (
                  <div key={index} className="flex flex-col items-center rounded-lg border p-3">
                    <div className="font-medium">{day.day}</div>
                    {day.icon}
                    <div className="mt-2 text-sm">{day.condition}</div>
                    <div className="mt-1 flex gap-2 text-sm">
                      <span className="font-medium">{day.high}°</span>
                      <span className="text-muted-foreground">{day.low}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="details">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 text-left">Day</th>
                      <th className="pb-2 text-left">Condition</th>
                      <th className="pb-2 text-left">High</th>
                      <th className="pb-2 text-left">Low</th>
                      <th className="pb-2 text-left">Precipitation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {forecast.map((day, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3">{day.day}</td>
                        <td className="py-3 flex items-center gap-2">
                          {day.icon}
                          <span>{day.condition}</span>
                        </td>
                        <td className="py-3">{day.high}°F</td>
                        <td className="py-3">{day.low}°F</td>
                        <td className="py-3">{day.precipitation}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  )
}

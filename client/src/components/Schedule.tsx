"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Calendar, MapPin } from "lucide-react";

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const schedule = {
    Monday: [
      {
        time: "6:00 AM",
        class: "Morning HIIT",
        instructor: "Sarah Johnson",
        spots: 12,
        location: "Studio A",
        difficulty: "High",
      },
      {
        time: "7:30 AM",
        class: "Yoga Flow",
        instructor: "Michael Chen",
        spots: 8,
        location: "Studio B",
        difficulty: "Medium",
      },
      {
        time: "12:00 PM",
        class: "Strength Training",
        instructor: "David Rodriguez",
        spots: 15,
        location: "Gym Floor",
        difficulty: "Medium",
      },
      {
        time: "6:00 PM",
        class: "Spin Class",
        instructor: "Emma Wilson",
        spots: 20,
        location: "Cycle Studio",
        difficulty: "High",
      },
      {
        time: "7:30 PM",
        class: "Pilates",
        instructor: "Lisa Thompson",
        spots: 10,
        location: "Studio B",
        difficulty: "Low",
      },
    ],
    Tuesday: [
      {
        time: "6:00 AM",
        class: "CrossFit",
        instructor: "Alex Morgan",
        spots: 16,
        location: "CrossFit Area",
        difficulty: "High",
      },
      {
        time: "9:00 AM",
        class: "Aqua Fitness",
        instructor: "Jennifer Lee",
        spots: 12,
        location: "Pool",
        difficulty: "Low",
      },
      {
        time: "5:30 PM",
        class: "Boxing",
        instructor: "Marcus Johnson",
        spots: 14,
        location: "Boxing Ring",
        difficulty: "High",
      },
      {
        time: "7:00 PM",
        class: "Zumba",
        instructor: "Sofia Martinez",
        spots: 25,
        location: "Studio A",
        difficulty: "Medium",
      },
    ],
    // Add more days...
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <section id="schedule" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Class <span className="text-primary">Schedule</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join our expert-led group classes designed for all fitness levels.
              Book your spot and get ready to sweat with our community!
            </p>
          </div>

          {/* Day Selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {days.map((day) => (
              <Button
                key={day}
                variant={selectedDay === day ? "default" : "outline"}
                className={
                  selectedDay === day
                    ? "gradient-primary text-white shadow-glow"
                    : "border-border hover:border-primary"
                }
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </Button>
            ))}
          </div>

          {/* Schedule Grid */}
          <div className="grid gap-6">
            {schedule[selectedDay as keyof typeof schedule]?.map(
              (session, index) => (
                <Card
                  key={index}
                  className="shadow-card hover:shadow-glow transition-smooth border-border bg-card"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center text-primary font-semibold">
                            <Clock className="h-5 w-5 mr-2" />
                            {session.time}
                          </div>
                          <Badge
                            className={getDifficultyColor(session.difficulty)}
                          >
                            {session.difficulty}
                          </Badge>
                        </div>

                        <h3 className="text-xl font-bold mb-2">
                          {session.class}
                        </h3>
                        <p className="text-muted-foreground mb-3">
                          with {session.instructor}
                        </p>

                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {session.location}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {session.spots} spots left
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button
                          className="gradient-primary text-white shadow-glow"
                          size="sm"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            )}
          </div>

          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-card rounded-lg shadow-card">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Classes per Week</div>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-card">
              <div className="text-3xl font-bold text-primary mb-2">15</div>
              <div className="text-muted-foreground">Class Types</div>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-card">
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-card">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Booking Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;

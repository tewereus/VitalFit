import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dumbbell,
  Users,
  Heart,
  Zap,
  Target,
  Monitor,
  ArrowRight,
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Dumbbell,
      title: "Strength Training",
      description:
        "Build muscle and increase power with our comprehensive strength training programs using state-of-the-art equipment.",
      features: [
        "Free Weights",
        "Resistance Machines",
        "Olympic Lifting",
        "Powerlifting",
      ],
      color: "from-primary to-primary/80",
    },
    {
      icon: Users,
      title: "Group Classes",
      description:
        "Join energizing group fitness classes led by certified instructors in a motivating community environment.",
      features: [
        "HIIT Training",
        "Yoga & Pilates",
        "Spin Classes",
        "Zumba & Dance",
      ],
      color: "from-accent to-accent/80",
    },
    {
      icon: Heart,
      title: "Cardio Training",
      description:
        "Improve cardiovascular health and endurance with our variety of cardio equipment and training programs.",
      features: [
        "Treadmills",
        "Ellipticals",
        "Rowing Machines",
        "Stair Climbers",
      ],
      color: "from-red-500 to-red-400",
    },
    {
      icon: Target,
      title: "Personal Training",
      description:
        "Get personalized attention with one-on-one training sessions tailored to your specific goals and fitness level.",
      features: [
        "Custom Workouts",
        "Nutrition Guidance",
        "Progress Tracking",
        "Goal Setting",
      ],
      color: "from-blue-500 to-blue-400",
    },
    {
      icon: Zap,
      title: "Functional Fitness",
      description:
        "Enhance daily movement patterns and athletic performance with functional training exercises.",
      features: ["CrossFit", "TRX Training", "Kettlebells", "Battle Ropes"],
      color: "from-purple-500 to-purple-400",
    },
    {
      icon: Monitor,
      title: "Virtual Training",
      description:
        "Access live and on-demand workout sessions from anywhere with our virtual training platform.",
      features: [
        "Live Streaming",
        "On-Demand Library",
        "Progress Tracking",
        "Mobile App",
      ],
      color: "from-green-500 to-green-400",
    },
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-primary">Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive fitness solutions designed to meet your unique
              goals, from strength building to cardiovascular health and
              everything in between.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-glow transition-smooth border-border bg-card shadow-card"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`bg-gradient-to-r ${service.color} p-4 rounded-full w-16 h-16 mb-4`}
                  >
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-smooth">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-sm"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-smooth"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Button
              size="lg"
              className="gradient-primary text-white font-semibold px-8 py-4 text-lg shadow-glow hover:scale-105 transition-smooth"
            >
              Book Your Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

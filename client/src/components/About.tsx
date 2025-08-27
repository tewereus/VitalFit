import { Shield, Award, Users, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Expert Certified Trainers",
      description:
        "All our trainers are certified professionals with years of experience in fitness and nutrition.",
    },
    {
      icon: Award,
      title: "State-of-the-Art Equipment",
      description:
        "Premium fitness equipment from leading brands, regularly maintained and updated.",
    },
    {
      icon: Users,
      title: "Supportive Community",
      description:
        "Join a motivating community of fitness enthusiasts who support each other's goals.",
    },
    {
      icon: Clock,
      title: "24/7 Access",
      description:
        "Work out on your schedule with round-the-clock access to our fully equipped facilities.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="text-primary">VitalFit</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're more than just a gym. We're your partners in achieving a
              healthier, stronger, and more confident you through personalized
              fitness solutions.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="shadow-card hover:shadow-glow transition-smooth border-border bg-background"
              >
                <CardContent className="p-6 text-center">
                  <div className="gradient-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 shadow-glow">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">5000+</div>
              <div className="text-muted-foreground">Happy Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Expert Trainers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

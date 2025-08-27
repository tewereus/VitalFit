import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap } from "lucide-react";

const Membership = () => {
  const plans = [
    {
      name: "Basic",
      price: "$29",
      period: "/month",
      description: "Perfect for getting started on your fitness journey",
      features: [
        "Gym Access (6 AM - 10 PM)",
        "Cardio & Strength Equipment",
        "Locker Room Access",
        "Free Fitness Assessment",
        "Mobile App Access",
      ],
      popular: false,
      color: "border-border",
    },
    {
      name: "Premium",
      price: "$49",
      period: "/month",
      description: "Our most popular plan with everything you need",
      features: [
        "Everything in Basic",
        "24/7 Gym Access",
        "Group Classes Included",
        "Guest Pass (2 per month)",
        "Nutrition Consultation",
        "Personal Training Session",
      ],
      popular: true,
      color: "border-primary shadow-glow",
    },
    {
      name: "Elite",
      price: "$79",
      period: "/month",
      description: "Premium experience with unlimited everything",
      features: [
        "Everything in Premium",
        "Unlimited Group Classes",
        "Weekly Personal Training",
        "Massage Therapy Access",
        "Nutrition Meal Plans",
        "Priority Booking",
        "Towel Service",
      ],
      popular: false,
      color: "border-accent",
    },
  ];

  const addOns = [
    { name: "Personal Training (4 sessions)", price: "$200" },
    { name: "Nutrition Coaching", price: "$80" },
    { name: "Meal Prep Service", price: "$120" },
    { name: "Massage Therapy", price: "$90" },
  ];

  return (
    <section id="membership" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Choose Your <span className="text-primary">Membership</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Flexible membership options designed to fit your lifestyle and
              budget. No hidden fees, no long-term contracts required.
            </p>
          </div>

          {/* Membership Plans */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${plan.color} bg-background transition-smooth hover:scale-105`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="gradient-primary text-white px-4 py-1">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-primary">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "gradient-primary text-white shadow-glow"
                        : "border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.popular ? "Start Free Trial" : "Choose Plan"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add-ons */}
          <div className="bg-background rounded-2xl p-8 shadow-card">
            <h3 className="text-2xl font-bold text-center mb-8">
              <Zap className="inline h-6 w-6 text-accent mr-2" />
              Add-On Services
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {addOns.map((addon, index) => (
                <div
                  key={index}
                  className="text-center p-4 border border-border rounded-lg hover:border-primary transition-smooth"
                >
                  <h4 className="font-semibold mb-2">{addon.name}</h4>
                  <p className="text-2xl font-bold text-primary mb-3">
                    {addon.price}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Add to Plan
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Special Offers */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-2xl font-bold mb-4">Limited Time Offer</h3>
              <p className="text-lg mb-6">
                Get your first month FREE when you sign up for any annual
                membership!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="gradient-primary text-white font-semibold px-8 py-4 shadow-glow"
                >
                  Claim Free Month
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Membership;

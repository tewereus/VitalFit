import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Jessica Smith",
      age: 32,
      achievement: "Lost 25 lbs in 8 weeks",
      image: "JS",
      rating: 5,
      text: "VitalFit transformed my life! The trainers are incredible and the community is so supportive. I've never felt stronger or more confident in my body.",
      before: "Struggled with consistency",
      after: "Workout 5x per week consistently",
    },
    {
      name: "Mike Johnson",
      age: 45,
      achievement: "Gained 15 lbs muscle",
      image: "MJ",
      rating: 5,
      text: "After years of trying different gyms, VitalFit is the only place where I've seen real results. The personal training program is exceptional.",
      before: "180 lbs, 18% body fat",
      after: "195 lbs, 12% body fat",
    },
    {
      name: "Sarah Williams",
      age: 28,
      achievement: "Completed first marathon",
      image: "SW",
      rating: 5,
      text: "The cardio programs and group classes prepared me for my first marathon. I couldn't have done it without the amazing support at VitalFit!",
      before: "Couch to 5K beginner",
      after: "Marathon finisher (3:45)",
    },
    {
      name: "David Chen",
      age: 38,
      achievement: "Overcame back pain",
      image: "DC",
      rating: 5,
      text: "The corrective exercise program helped me overcome chronic back pain. Now I'm stronger than I was in my twenties!",
      before: "Chronic back pain",
      after: "Pain-free and deadlifting 300lbs",
    },
    {
      name: "Emma Rodriguez",
      age: 26,
      achievement: "Built confidence",
      image: "ER",
      rating: 5,
      text: "VitalFit isn't just about physical transformation - it's about mental strength too. I've gained so much confidence and self-esteem.",
      before: "Low self-confidence",
      after: "Confident and empowered",
    },
    {
      name: "Tom Wilson",
      age: 52,
      achievement: "Improved health markers",
      image: "TW",
      rating: 5,
      text: "My doctor is amazed at my health improvements. Blood pressure, cholesterol, and energy levels - everything is better since joining VitalFit.",
      before: "High BP, low energy",
      after: "Perfect health markers",
    },
  ];

  const transformationStats = [
    { number: "2,500+", label: "Success Stories" },
    { number: "450,000+", label: "Pounds Lost" },
    { number: "98%", label: "Goal Achievement Rate" },
    { number: "4.9/5", label: "Average Rating" },
  ];

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Real <span className="text-primary">Transformations</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it. Hear from real members who have
              transformed their lives and achieved their fitness goals at
              VitalFit.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {transformationStats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-card rounded-lg shadow-card"
              >
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="group hover:shadow-glow transition-smooth border-border bg-card shadow-card"
              >
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <Quote className="h-8 w-8 text-primary/30" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className="h-4 w-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-muted-foreground mb-6 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>

                  {/* Transformation Details */}
                  <div className="bg-background rounded-lg p-4 mb-6 border border-border">
                    <h4 className="font-semibold text-primary mb-2">
                      Transformation
                    </h4>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Before: </span>
                        <span>{testimonial.before}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">After: </span>
                        <span className="text-primary font-semibold">
                          {testimonial.after}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="flex items-center">
                    <div className="gradient-primary w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-glow">
                      <span className="text-white font-bold text-sm">
                        {testimonial.image}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Age {testimonial.age}
                      </div>
                      <div className="text-sm text-primary font-semibold">
                        {testimonial.achievement}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Featured Success Story */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">
                Featured Success Story
              </h3>
              <div className="max-w-3xl mx-auto">
                <p className="text-lg mb-6 italic">
                  "In 6 months at VitalFit, I went from being unable to do a
                  single push-up to completing my first obstacle race. The
                  transformation has been incredible - not just physically, but
                  mentally and emotionally too."
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <div className="gradient-primary w-16 h-16 rounded-full flex items-center justify-center shadow-glow">
                    <span className="text-white font-bold">AL</span>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">Amanda Lee</div>
                    <div className="text-muted-foreground">
                      Obstacle Race Champion
                    </div>
                    <div className="text-primary font-semibold">
                      Lost 40 lbs • Gained Strength • Built Confidence
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

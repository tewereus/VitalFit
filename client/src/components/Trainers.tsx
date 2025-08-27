import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Award, Instagram, Twitter, Linkedin } from "lucide-react";

const Trainers = () => {
  const trainers = [
    {
      name: "Sarah Johnson",
      specialty: "HIIT & Strength Training",
      experience: "8 years",
      certifications: ["NASM-CPT", "HIIT Specialist"],
      rating: 4.9,
      bio: "Passionate about helping clients achieve their strongest selves through high-intensity training and strength building.",
      achievements: [
        "Fitness Competition Winner",
        "500+ Client Transformations",
      ],
      image: "SJ",
      socials: { instagram: "@sarahjfit", twitter: "@sarahj_trainer" },
    },
    {
      name: "Michael Chen",
      specialty: "Yoga & Mindfulness",
      experience: "10 years",
      certifications: ["RYT-500", "Meditation Teacher"],
      rating: 4.8,
      bio: "Combines traditional yoga practices with modern fitness to create balanced wellness programs for mind and body.",
      achievements: ["Yoga Alliance Certified", "Mindfulness Expert"],
      image: "MC",
      socials: { instagram: "@michaelchenyoga", linkedin: "michael-chen-yoga" },
    },
    {
      name: "David Rodriguez",
      specialty: "Powerlifting & Nutrition",
      experience: "12 years",
      certifications: ["CSCS", "Precision Nutrition"],
      rating: 4.9,
      bio: "Former competitive powerlifter specializing in strength development and sports nutrition for optimal performance.",
      achievements: ["National Powerlifting Champion", "Nutrition Specialist"],
      image: "DR",
      socials: { instagram: "@davidr_lifts", twitter: "@coach_rodriguez" },
    },
    {
      name: "Emma Wilson",
      specialty: "Cardio & Group Fitness",
      experience: "6 years",
      certifications: ["ACE-GFI", "Spin Instructor"],
      rating: 4.7,
      bio: "Energetic group fitness instructor who creates fun, challenging workouts that keep you motivated and engaged.",
      achievements: ["Top Group Fitness Instructor", "Spin Certification"],
      image: "EW",
      socials: { instagram: "@emmawilsonfit", twitter: "@emma_fitness" },
    },
    {
      name: "Marcus Johnson",
      specialty: "Boxing & Martial Arts",
      experience: "15 years",
      certifications: ["USA Boxing Coach", "Krav Maga Instructor"],
      rating: 4.9,
      bio: "Former professional boxer bringing authentic fight training techniques to fitness enthusiasts of all levels.",
      achievements: ["Professional Boxing Record", "Self-Defense Expert"],
      image: "MJ",
      socials: {
        instagram: "@marcusj_boxing",
        linkedin: "marcus-johnson-boxing",
      },
    },
    {
      name: "Lisa Thompson",
      specialty: "Pilates & Rehabilitation",
      experience: "9 years",
      certifications: ["PMA-CPT", "Physical Therapy Assistant"],
      rating: 4.8,
      bio: "Specializes in corrective exercise and pilates to help clients recover from injuries and prevent future ones.",
      achievements: ["Rehabilitation Specialist", "Pilates Master Trainer"],
      image: "LT",
      socials: {
        instagram: "@lisathompsonpilates",
        linkedin: "lisa-thompson-pilates",
      },
    },
  ];

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return Instagram;
      case "twitter":
        return Twitter;
      case "linkedin":
        return Linkedin;
      default:
        return Instagram;
    }
  };

  return (
    <section id="trainers" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Our <span className="text-primary">Expert Trainers</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our certified trainers are passionate professionals dedicated to
              helping you achieve your fitness goals with personalized guidance
              and motivation.
            </p>
          </div>

          {/* Trainers Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainers.map((trainer, index) => (
              <Card
                key={index}
                className="group hover:shadow-glow transition-smooth border-border bg-background shadow-card"
              >
                <CardContent className="p-6">
                  {/* Trainer Avatar & Rating */}
                  <div className="text-center mb-6">
                    <div className="gradient-primary w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center shadow-glow">
                      <span className="text-white text-2xl font-bold">
                        {trainer.image}
                      </span>
                    </div>
                    <div className="flex items-center justify-center mb-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 font-semibold">
                        {trainer.rating}
                      </span>
                      <span className="text-muted-foreground text-sm ml-1">
                        (150+ reviews)
                      </span>
                    </div>
                  </div>

                  {/* Trainer Info */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-smooth">
                      {trainer.name}
                    </h3>
                    <Badge className="gradient-secondary text-white mb-3">
                      {trainer.specialty}
                    </Badge>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {trainer.bio}
                    </p>
                  </div>

                  {/* Experience & Certifications */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="font-semibold">Experience:</span>
                      <span className="text-primary">{trainer.experience}</span>
                    </div>

                    <div className="mb-3">
                      <span className="font-semibold text-sm mb-2 block">
                        Certifications:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {trainer.certifications.map((cert, certIndex) => (
                          <Badge
                            key={certIndex}
                            variant="outline"
                            className="text-xs"
                          >
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="font-semibold text-sm mb-2 block">
                        Achievements:
                      </span>
                      <ul className="text-xs text-muted-foreground">
                        {trainer.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-center">
                            <Award className="h-3 w-3 text-accent mr-2 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Social Links & Actions */}
                  <div className="space-y-3">
                    <div className="flex justify-center space-x-3">
                      {Object.entries(trainer.socials).map(
                        ([platform, handle]) => {
                          const IconComponent = getSocialIcon(platform);
                          return (
                            <button
                              key={platform}
                              className="p-2 rounded-full bg-muted hover:bg-primary hover:text-white transition-smooth"
                            >
                              <IconComponent className="h-4 w-4" />
                            </button>
                          );
                        }
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Profile
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 gradient-primary text-white shadow-glow"
                      >
                        Book Session
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-background rounded-2xl p-8 shadow-card">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Start Training?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get matched with the perfect trainer for your goals and start
                your transformation today.
              </p>
              <Button
                size="lg"
                className="gradient-primary text-white font-semibold px-8 py-4 shadow-glow hover:scale-105 transition-smooth"
              >
                Find Your Trainer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trainers;

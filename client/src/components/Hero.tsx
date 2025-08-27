import { Button } from "@/components/ui/button";
import { Play, Star, Users, Trophy } from "lucide-react";
import heroImage from "../assets/hero-gym.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Stats Banner */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center space-x-2 bg-card/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">4.9/5 Rating</span>
            </div>
            <div className="flex items-center space-x-2 bg-card/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">5000+ Members</span>
            </div>
            <div className="flex items-center space-x-2 bg-card/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Trophy className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Award Winning</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Transform Your Body in{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              30 Days
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join VitalFit's premium fitness center with expert coaching,
            state-of-the-art equipment, and personalized training programs
            designed to deliver real results.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="gradient-primary text-white font-semibold px-8 py-4 text-lg shadow-glow hover:scale-105 transition-smooth"
            >
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 font-semibold px-8 py-4 text-lg"
            >
              <Play className="h-5 w-5 mr-2" />
              Watch Tour
            </Button>
          </div>

          {/* Success Story Preview */}
          <div className="bg-card/20 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-sm text-foreground/60 mb-2">Success Story</p>
            <p className="text-lg font-medium mb-3">
              "Lost 25 lbs and gained incredible strength in just 8 weeks!"
            </p>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">JS</span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm">Jessica Smith</p>
                <p className="text-xs text-foreground/60">VitalFit Member</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

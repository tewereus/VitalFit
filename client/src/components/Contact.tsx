import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      details: [
        "123 Fitness Avenue",
        "Downtown District",
        "New York, NY 10001",
      ],
      action: "Get Directions",
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["(555) 123-4567", "Call or Text"],
      action: "Call Now",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@vitalfit.com", "Support Available 24/7"],
      action: "Send Email",
    },
    {
      icon: Clock,
      title: "Hours",
      details: [
        "Mon-Fri: 5:00 AM - 11:00 PM",
        "Sat-Sun: 6:00 AM - 10:00 PM",
        "24/7 Access for Members",
      ],
      action: "View Schedule",
    },
  ];

  const socialLinks = [
    { icon: Facebook, name: "Facebook", followers: "12K" },
    { icon: Instagram, name: "Instagram", followers: "25K" },
    { icon: Twitter, name: "Twitter", followers: "8K" },
    { icon: Youtube, name: "YouTube", followers: "15K" },
  ];

  return (
    <section id="contact" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Get In <span className="text-primary">Touch</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ready to start your fitness journey? Contact us today for a free
              consultation and tour of our state-of-the-art facility.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-card border-border bg-background">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">
                      First Name
                    </label>
                    <Input placeholder="John" className="border-border" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">
                      Last Name
                    </label>
                    <Input placeholder="Doe" className="border-border" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    className="border-border"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Phone
                  </label>
                  <Input
                    type="tel"
                    placeholder="(555) 123-4567"
                    className="border-border"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Fitness Goals
                  </label>
                  <select className="w-full p-3 border border-border rounded-md bg-background">
                    <option>Weight Loss</option>
                    <option>Muscle Building</option>
                    <option>General Fitness</option>
                    <option>Athletic Performance</option>
                    <option>Rehabilitation</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Message
                  </label>
                  <Textarea
                    placeholder="Tell us about your fitness goals and how we can help..."
                    className="min-h-32 border-border"
                  />
                </div>

                <Button
                  className="w-full gradient-primary text-white font-semibold py-4 shadow-glow hover:scale-105 transition-smooth"
                  size="lg"
                >
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="shadow-card border-border bg-background hover:shadow-glow transition-smooth"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="gradient-primary p-3 rounded-lg shadow-glow flex-shrink-0">
                        <info.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                        <div className="space-y-1 mb-3">
                          {info.details.map((detail, detailIndex) => (
                            <p
                              key={detailIndex}
                              className="text-muted-foreground text-sm"
                            >
                              {detail}
                            </p>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-primary hover:text-primary-foreground"
                        >
                          {info.action}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Social Media */}
              <Card className="shadow-card border-border bg-background">
                <CardHeader>
                  <CardTitle>Follow Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((social, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border border-border rounded-lg hover:border-primary transition-smooth"
                      >
                        <div className="flex items-center space-x-3">
                          <social.icon className="h-5 w-5 text-primary" />
                          <span className="font-medium">{social.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {social.followers}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card className="shadow-card border-border bg-background">
                <CardContent className="p-6">
                  <div className="bg-muted rounded-lg h-48 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
                      <p className="text-muted-foreground">Interactive Map</p>
                      <p className="text-sm text-muted-foreground">
                        123 Fitness Avenue, NYC
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Contact CTA */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Today?</h3>
              <p className="text-lg mb-6 text-muted-foreground">
                Get your free consultation and facility tour. No commitment
                required!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="gradient-primary text-white font-semibold px-8 py-4 shadow-glow"
                >
                  Schedule Free Tour
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4"
                >
                  Call (555) 123-4567
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

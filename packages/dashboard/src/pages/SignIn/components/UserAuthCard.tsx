import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, Mail } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { sendMagicLink } from "@/services/AuthService";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleSignIn } from "@/lib/utils";

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type emailFormValues = z.infer<typeof emailSchema>;

const UserAuthCard: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<emailFormValues>({
    resolver: zodResolver(emailSchema),
  });

  const sendMagicLinkMutation = useMutation({
    mutationFn: (email: string) => sendMagicLink(email),
  });

  const onSubmit = handleSubmit((data: emailFormValues) =>
    sendMagicLinkMutation.mutate(data.email)
  );

  return (
    <Card className="w-[350px] bg-white">
      <CardHeader>
        <CardTitle className="text-center">Welcome</CardTitle>
        <CardDescription className="text-center">
          Choose your login method
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button
            variant="outline"
            onClick={() => handleSignIn("google")}
            className="w-full bg-white hover:bg-gray-50"
          >
            <svg
              className="mr-2 h-4 w-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Login with Google
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSignIn("github")}
            className="w-full bg-white hover:bg-gray-50"
          >
            <Github className="mr-2 h-4 w-4" />
            Login with GitHub
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-center text-gray-600 w-full">
          By logging in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </CardFooter>
    </Card>
  );
};

export default UserAuthCard;

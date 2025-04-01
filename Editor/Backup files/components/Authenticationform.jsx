import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./redux/AuthSlice";
import { useDisclosure } from "@mantine/hooks";

import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Anchor,
  Stack,
} from "@mantine/core";
import { GoogleButton } from "../components/ui/GoogleButton";
import { TwitterButton } from "../components/ui/TwitterButton";
import Spinner from "./Spinner";

export function AuthenticationForm() {
  const navigate = useNavigate();
  const [visible, { toggles }] = useDisclosure(true);
  const dispatch = useDispatch();
  const [type, toggle] = useToggle(["login", "register"]);
  const [loading, setLoading] = useState(false); // Optional: for showing a loading indicator
  const form = useForm({
    initialValues: {
      email: "",
      full_name: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const url =
        type === "register" ? "/api/v1/user/signup" : "/api/v1/user/login";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (data.status == "Success") {
        dispatch(
          login({
            full_name: data.response.user.fullName,
            email: data.response.user.email,
          })
        );
        navigate("/");
      } else {
        if (data.status == "Error") {
          form.setFieldError("password", data.error);
        }
      }
    } catch (error) {
      // console.error("Network error:", error);
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <div className="h-screen">
      {loading ? <Spinner /> : ""}
      <div className="flex items-center justify-center align-middle h-screen absolute mx-auto z-50 w-full md:w-[90%]">
        <Paper radius="md" withBorder>
          <Link to="/">
            <IconX className="mx-auto mt-2 cursor-pointer" />
          </Link>

          <div className="px-8 py-5">
            <Text size="lg" fw={500}>
              Welcome to CodeSphere, {type} with
            </Text>

            <Group grow mb="md" mt="md">
              <GoogleButton radius="xl">Google</GoogleButton>
              <TwitterButton radius="xl">Twitter</TwitterButton>
            </Group>

            <Divider
              label="Or continue with email"
              labelPosition="center"
              my="lg"
            />

            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
              <Stack>
                {type === "register" && (
                  <TextInput
                    label="Full Name"
                    placeholder="Your name"
                    value={form.values.full_name}
                    onChange={(event) =>
                      form.setFieldValue("full_name", event.currentTarget.value)
                    }
                    radius="md"
                  />
                )}

                <TextInput
                  required
                  label="Email"
                  placeholder="hello@codesphere.dev"
                  value={form.values.email}
                  onChange={(event) =>
                    form.setFieldValue("email", event.currentTarget.value)
                  }
                  error={form.errors.email}
                  radius="md"
                />

                <PasswordInput
                  required
                  label="Password"
                  placeholder="Your password"
                  value={form.values.password}
                  onChange={(event) =>
                    form.setFieldValue("password", event.currentTarget.value)
                  }
                  error={form.errors.password}
                  radius="md"
                />
              </Stack>

              <Group justify="space-between" mt="xl">
                <Anchor
                  component="button"
                  type="button"
                  color="dimmed"
                  onClick={() => toggle()}
                  size="xs"
                >
                  {type === "register"
                    ? "Already have an account? Login"
                    : "Don't have an account? Register"}
                </Anchor>
                <Button type="submit" radius="xl" loading={loading}>
                  {upperFirst(type)}
                </Button>
              </Group>
            </form>
          </div>
        </Paper>
      </div>
    </div>
  );
}

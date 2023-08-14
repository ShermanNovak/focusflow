import { useThemeColourQuery, useThemeColourUpdate } from "../api/user.query";
import { Typography } from "antd";
import PageTitle from "../components/PageTitle";

const { Text } = Typography;

export default function Settings() {
  const updateThemeColourMutation = useThemeColourUpdate();

  const updateTheme = (themeColour: string) => {
    updateThemeColourMutation.mutate({ themeColour: themeColour });
  };

  const { data: themeColour } = useThemeColourQuery();

  return (
    <div className="p-8">
      <PageTitle text="Settings" />
      <div className="flex items-center mt-5">
        <Text className="pr-2">My Colour Scheme:</Text>
        <button
          className="bg-navbar-green h-6 w-6 rounded-full"
          onClick={() => {
            updateTheme("bg-navbar-green");
          }}
          disabled={themeColour === "bg-navbar-green"}
        ></button>
        <button
          className="bg-pastel-orange h-6 w-6 rounded-full"
          onClick={() => {
            updateTheme("bg-pastel-orange");
          }}
          disabled={themeColour === "bg-pastel-orange"}
        ></button>
        <button
          className="bg-pale-purple h-6 w-6 rounded-full"
          onClick={() => {
            updateTheme("bg-pale-purple");
          }}
          disabled={themeColour === "bg-pale-purple"}
        ></button>
        <button
          className="bg-pale-yellow h-6 w-6 rounded-full"
          onClick={() => {
            updateTheme("bg-pale-yellow");
          }}
          disabled={themeColour === "bg-pale-yellow"}
        ></button>
      </div>
    </div>
  );
}

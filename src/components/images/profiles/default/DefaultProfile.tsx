import { useEffect, useState } from "react";
import "./default-profile.css"

interface Props {
  shortName: string;
}

export const DefaultProfile = ({ shortName }: Props) => {
  const [profile, setProfile] = useState("S3");

  const handleProfileText = () => {
    if (!shortName.trim()) return "";

    const palabras = shortName.trim().split(/\s+/);
    let initials = "";

    for (const palabra of palabras) {
      initials += palabra[0].toUpperCase();
    }

    setProfile(initials);
  };

  useEffect(() => {
    handleProfileText();
  }, [shortName]);

  return <div className="default-profile-image-container flex-column-center">{profile}</div>;
};

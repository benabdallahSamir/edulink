"use client";

import { useState } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { genProfileImg } from "@/public/avatars/avatar";
import { updateProfileImage, updateUser } from "@/request/user";
import { setState } from "@/redux/user";
import { useRouter } from "next/navigation";
import { errorNotifcation, successNotifcation } from "./toast";

const ProfileForm = () => {
  const router = useRouter();
  const { user, isLoggin } = useSelector((s) => s.user);
  const [profileImage, setProfileImage] = useState(genProfileImg(user.picture));
  const dispatch = useDispatch();
  if (!isLoggin) router.push("/");
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    bio: user.bio,
    language: user.language,
    link: user.link,
  });
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
      const formData = new FormData();
      formData.append('profileImage', file);
      const {status , data} = await updateProfileImage(formData);
      if (status === 200) {
        successNotifcation("profile picture update succesfuly")
        dispatch(setState(data.userinfo))
      }else if(status === 10) {
        errorNotifcation("error with code 10")
      }else {
        errorNotifcation(data);
      }
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { status, data } = await updateUser(formData);
    switch (status) {
      case 200:
        successNotifcation("updated successfuly");
        dispatch(setState(data.user));
        break;
      case 401:
        router.push("/");
        errorNotifcation(data.message);
        break;
      case 10:
        errorNotifcation("error with status 10");
        break;
      case 204:
        console.log("nothing change");
        break;
      default:
        errorNotifcation(data.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container mx-auto px-4 py-8 max-w-2xl"
    >
      <div className="space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-[#3EDAD8] overflow-hidden">
              <img
                src={profileImage || "/bigcard.jpg"}
                alt="Profile"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              size="icon"
              variant="secondary"
              className="absolute bottom-0 right-0 rounded-full"
              onClick={() =>
                document.getElementById("profileImageInput").click()
              }
            >
              <Camera className="h-4 w-4" color="white" />
            </Button>
            <input
              type="file"
              id="profileImageInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">bio</Label>
            <Input id="bio" value={formData.bio} onChange={handleInputChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select
              value={formData.language}
              onValueChange={(value) =>
                setFormData({ ...formData, language: value })
              }
            >
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ar">Arabic</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="link">Link</Label>
            <Input
              id="link"
              value={formData.link}
              onChange={handleInputChange}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#3EDAD8] hover:bg-[#35c2c1] text-white"
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;

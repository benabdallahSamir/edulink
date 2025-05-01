import avatar1 from "./avatar1.png";
import avatar2 from "./avatar2.png";
import avatar3 from "./avatar3.png";
import avatar4 from "./avatar4.png";
import avatar5 from "./avatar5.png";
import avatar6 from "./avatar6.png";
import avatar7 from "./avatar7.png";
import avatar8 from "./avatar8.png";
import avatar9 from "./avatar9.png";
import avatar10 from "./avatar10.png";

const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
];

export function getRandomAvatar() {
  const randomNumber = (Math.floor(Math.random() * 1000) % 10) + 1;
  return `avatar${randomNumber}.png`;
}

export function genProfileImg(name) {
  if (!name) return avatar10;
  return name.startsWith("avatar") ? `/avatars/${name}` : name;
}

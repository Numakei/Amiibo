import { useState } from "react";
function CharaImage(item) {
  const [hover, setHover] = useState(false);
  console.log(item.name);
  return (
    <div class="isHover">
      <img src={item.name.image}></img>
      <div class="mask">
        <div class="caption">{item.name.character}</div>
      </div>
    </div>
  );
}

export default CharaImage;

// import emailjs from "emailjs-com";
import { IonIcon } from "@ionic/react";
import { send, camera } from "ionicons/icons";
import { useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import "./styles.css";

export default function Mail() {
  const [sending, setSending] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [toSend, setToSend] = useState(null);
  const [msg, setMsg] = useState("");
  const [sub, setSub] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!photo) {
      alert("please take a picture");
      return;
    }
    setSending(true);

    let data = new FormData();
    data.append("base64", toSend);
    data.append("email", email);
    data.append("subject", sub);
    data.append("message", msg);
    fetch("https://api-smpt.000webhostapp.com/app.php", {
      method: "POST",
      body: data
    })
      .then((res) => {
        setSending(false);
        console.log(res);
        res.text().then((text) => {
          if (text.includes("email was sent")) {
            alert("Email sent successfully");
            setPhoto(null);
            setToSend(null);
            setMsg("");
            setSub("");
            setEmail("");
          } else {
            alert(text); //if something goes wrong
          }
        });
      })
      .catch((err) => {
        setSending(false);
        alert("yak! something went wrong");
        console.log(err);
      });
  };
  const takePhoto = async () => {
    await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100
    })
      .then((res) => {
        console.log(res);
        setToSend(res.base64String);
        setPhoto(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="error"></div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          name="email"
          placeholder="exemple@email.com"
          type="email"
        />
        <input
          value={sub}
          onChange={(e) => setSub(e.target.value)}
          required
          name="subject"
          placeholder="Subject"
          type="text"
        />
        <textarea
          required
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          name="message"
          id="message"
          placeholder="Message..."
          cols="30"
          rows="4"
        />

        {photo ? (
          <div id="img">
            <img
              src={`data:image/jpeg;base64,${photo.base64String}`}
              alt="Attachement"
            />
          </div>
        ) : null}
        <span id="takePhoto">
          <IonIcon
            icon={camera}
            onClick={() => {
              takePhoto();
              console.log(photo);
            }}
          ></IonIcon>
        </span>

        <button type="submit">
          {sending ? (
            <span className="loading"></span>
          ) : (
            <>
              <span>Send</span> <IonIcon icon={send} />
            </>
          )}
        </button>
      </form>
    </>
  );
}

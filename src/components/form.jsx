import emailjs from "emailjs-com";

export default function Mail() {
  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      "service_aafh0lb",
      "service_aafh0lb",
      e.target,
      "user_TS34Pj4uExvWcV74HzJgj"
    ).then(res=>{console.log("Done !",res)}).catch(err=>console.log(`Something went wrong ${err}`));
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input name="email" placeholder="Email" type="email" />
      <input name="subject" placeholder="Subject" type="text" />
      <textarea name="message" id="message" cols="30" rows="4" />
      <input type="submit" value="Send" />
    </form>
  );
}

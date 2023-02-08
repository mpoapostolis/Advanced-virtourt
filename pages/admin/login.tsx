export default function Login() {
  return (
    <div className="grid h-screen w-screen place-items-center ">
      <form className=" form-control p-4 " action="">
        <input
          placeholder="username"
          className="input-bordered input"
          type="text"
          name="username"
        />
        <br />
        <input
          placeholder="password"
          className="input-bordered input"
          type="password"
          name="password"
        />
        <br />
        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

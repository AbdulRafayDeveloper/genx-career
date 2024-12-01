"use client";

const Page = () => {
  return (
    <div className="relative">
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/images/design.png')",
        }}
      ></div>
      <div className="font-[sans-serif] relative z-10">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-4 max-w-5xl w-full">
            <div>
              <h2 className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px] text-purple-900 font-serif">
                Seamless Register For Exclusive Access
              </h2>
              <p className="text-sm mt-6 text-gray-800">
                Immerse yourself in a hassle-free login journey with our
                intuitively designed login Form. Effortlessly access your
                account.
              </p>
              <p className="text-sm mt-12 text-gray-800">
                Already have an account?{" "}
                <a
                  href="/auth/login"
                  className="text-purple-600 font-semibold hover:underline ml-1"
                >
                  Login here
                </a>
              </p>
            </div>

            <form className="max-w-md md:ml-auto w-full">
              <h3 className="text-purple-900 font-serif text-3xl font-extrabold mb-8">
                Register
              </h3>

              <div className="space-y-4">
                <div>
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="bg-gray-100 bg-opacity-40 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-purple-600 focus:bg-transparent"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="bg-gray-100 bg-opacity-40 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-purple-600 focus:bg-transparent"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <input
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="bg-gray-100 bg-opacity-40  w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-purple-600 focus:bg-transparent"
                    placeholder="Password"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-3 block text-sm text-gray-800"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="button"
                  className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded bg-purple-600 text-white hover:text-purple-500 focus:outline-none"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

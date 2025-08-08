import ProfileCard from "../ui/card/ProfileCard";

const ExperienceSection = () => {
  const user = {
    imageUrl: "/images/avatar.png",
    name: "Albar Moerhamsa",
    title: "Frontend Engineer",
    description: "A Frontend Engineer who focuses on simplicity & usability.",
  };

  return (
    <div className="w-screen flex flex-col justify-between gap-12 py-12 lg:py-20 overflow-hidden">
      <div className="relative h-screen cursor-default text-sm tracking-normal select-none">
        <div
          className="relative size-full"
          style={{
            maskImage:
              "linear-gradient(to bottom, #000 80%, transparent 100%), linear-gradient(to right, #000 80%, transparent 100%), linear-gradient(to top, #000 80%, transparent 100%), linear-gradient(to left, #000 80%, transparent 100%)",
            WebkitMaskComposite: "intersect",
          }}
        >
          <div className="absolute -left-8 size-full -translate-y-16 rotate-[-5deg] skew-x-[10deg]">
            <div
              className="absolute inset-0 top-8 left-8"
              style={{
                backgroundSize: "32px",
                backgroundPosition: "center center",
                backgroundImage:
                  "url('data:image/svg+xml,%3Csvg viewBox=%220 0 32 32%22 fill=%22none%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg opacity=%22.4%22 fill=%22%23011E32%22 fill-opacity=%22.24%22%3E%3Cpath fill-rule=%22evenodd%22 clip-rule=%22evenodd%22 d=%22M0 .5V6h.5V.5H6V0H0v.5ZM.5 32H0v-6h.5v5.5H6v.5H.5ZM32 0v6h-.5V.5H26V0h6Zm0 31.5V26h-.5v5.5H26v.5h6v-.5Z%22/%3E%3Cpath opacity=%22.6%22 d=%22M19 0v.5h-6V0zM19 31.5v.5h-6v-.5zM32 19h-.5v-6h.5zM.5 19H0v-6h.5z%22/%3E%3C/g%3E%3C/svg%3E')",
              }}
              data-light
            />
            <div
              className="absolute inset-0 top-8 left-8 dark:block hidden"
              style={{
                backgroundSize: "32px",
                backgroundPosition: "center center",
                backgroundImage:
                  "url('data:image/svg+xml,%3Csvg viewBox=%220 0 32 32%22 fill=%22none%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg opacity=%22.4%22 fill=%22%23ffffff%22 fill-opacity=%22.10%22%3E%3Cpath fill-rule=%22evenodd%22 clip-rule=%22evenodd%22 d=%22M0 .5V6h.5V.5H6V0H0v.5ZM.5 32H0v-6h.5v5.5H6v.5H.5ZM32 0v6h-.5V.5H26V0h6Zm0 31.5V26h-.5v5.5H26v.5h6v-.5Z%22/%3E%3Cpath opacity=%22.6%22 d=%22M19 0v.5h-6V0zM19 31.5v.5h-6v-.5zM32 19h-.5v-6h.5zM.5 19H0v-6h.5z%22/%3E%3C/g%3E%3C/svg%3E')",
              }}
            />

            <div className="absolute overflow-x-scroll flex space-x-10 top-52 left-1/2 w-[744px] -translate-x-1/2 space-y-2">
              <ProfileCard
                variant="solid"
                {...user}
                description="A Product Designer focused on intuitive user experiences."
              />

              <section className="dark:text-white space-y-3.5">
                <h2 className="text-2xl font-semibold">
                  The offers don&apos;t lie
                </h2>
                <p>
                  Front end interviews are even broader in scope than
                  traditional software engineering interviews.
                </p>
                <br />

                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="flex h-10 w-72 items-center rounded-md space-x-2 border border-[#ff9a24] bg-[#ffe6c8] py-2 pr-1 pl-3"
                    style={{
                      backgroundImage:
                        'url(\'data:image/svg+xml,%3Csvg width="5" height="5" viewBox="0 0 5 5" stroke-width="0.5" stroke="%23ff9a24" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M-1 5L5 -1M3 6L6 3"/%3E%3C/svg%3E\')',
                    }}
                  />
                ))}

                <div className="absolute top-[100px] right-20 w-72">
                  <ul className="grid gap-3.5">
                    <li className="bg-white/90 cursor-pointer border hover:bg-white text-primary-dark flex h-10 w-full items-center justify-between space-x-2 rounded-md py-2 pr-1 pl-3 shadow-[0_0_0_1px_#00000022,0_8px_16px_#00000022] transition duration-300 will-change-transform hover:translate-x-1 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#00000022,0_8px_16px_#00000011]">
                      Feedloop.io
                    </li>
                    <li className="bg-white/90 cursor-pointer border hover:bg-white text-primary-dark flex h-10 w-full items-center justify-between space-x-2 rounded-md py-2 pr-1 pl-3 shadow-[0_0_0_1px_#00000022,0_8px_16px_#00000022] transition duration-300 will-change-transform hover:translate-x-1 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#00000022,0_8px_16px_#00000011]">
                      Bank BRI
                    </li>
                    <li className="bg-white/90 cursor-pointer border hover:bg-white text-primary-dark flex h-10 w-full items-center justify-between space-x-2 rounded-md py-2 pr-1 pl-3 shadow-[0_0_0_1px_#00000022,0_8px_16px_#00000022] transition duration-300 will-change-transform hover:translate-x-1 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#00000022,0_8px_16px_#00000011]">
                      Next Step...
                    </li>
                  </ul>
                </div>
                <p>
                  Front end interviews are even broader in scope than
                  traditional software engineering interviews.
                </p>
                <section className="grid grid-cols-4 gap-5">
                  {[...Array(4)].map((_, i) => (
                    <img
                      key={i}
                      src={
                        "https://media.licdn.com/dms/image/v2/D562DAQEUjlqk3p7vPQ/profile-treasury-image-shrink_1280_1280/profile-treasury-image-shrink_1280_1280/0/1714370158193?e=1754719200&v=beta&t=zGp9sAxMWBl_WVg5vA7pEBIlnpAPGLTXtM6xgj6z1TU"
                      }
                      alt={`Profile of`}
                      className="aspect-square object-cover rounded cursor-pointer shadow-[0_0_0_1px_#00000022,0_8px_16px_#00000022] transition duration-300 will-change-transform hover:translate-x-1 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#00000022,0_8px_16px_#00000011]"
                      width={200}
                      height={350}
                    />
                  ))}
                </section>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;

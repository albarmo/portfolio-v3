import { Link } from "@remix-run/react";
import { Linkedin, VerifiedIcon } from "lucide-react";
import { FC } from "react";

type ProfileCardProps = {
  variant?: "solid" | "glass";
  imageUrl: string;
  name: string;
  title: string;
  description: string;
};

const ProfileCard: FC<ProfileCardProps> = ({
  variant = "solid",
  imageUrl,
  name,
  title,
  description,
}) => {
  const cardBaseClasses = `
    relative group overflow-hidden cursor-pointer
    min-w-80 max-w-xs w-full rounded-3xl p-4 flex flex-col gap-4
    bg-opacity-90 transition-transform duration-300 ease-in-out
    hover:shadow-2xl hover:shadow-black/20
    will-change-transform
  `;

  const variantClasses = {
    solid: "bg-white dark:bg-neutral-800 dark:text-white shadow-lg",
    glass:
      "bg-white/10 backdrop-blur-lg border border-white/20 text-white shadow-2xl",
  };

  const buttonBaseClasses =
    "flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors";

  const buttonVariantClasses = {
    solid: "bg-white dark:bg-neutral-700 dark:hover:bg-neutral-600",
    glass: "bg-white/90 hover:bg-white text-black",
  };

  return (
    <div
      className={`${cardBaseClasses} ${variantClasses[variant]} absolute bottom-3.5 left-3.5`}
    >
      {/* Bagian Atas: Gambar, Nama, dan Deskripsi */}
      <div className="flex flex-col gap-4">
        <section className="relative inset-0">
          <div
            className="flex h-64 w-72 rounded-2xl items-center space-x-2 border border-[#ff9a24] bg-[#ffe6c8] py-2 pr-1 pl-3"
            style={{
              backgroundImage:
                'url(\'data:image/svg+xml,%3Csvg width="5" height="5" viewBox="0 0 5 5" stroke-width="0.5" stroke="%23ff9a24" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M-1 5L5 -1M3 6L6 3"/%3E%3C/svg%3E\')',
            }}
          />
          <img
            src={imageUrl}
            alt={`Profile of ${name}`}
            className="
              absolute -top-3 left-3 w-full h-64 object-cover rounded-2xl
              shadow-[0_0_0_1px_#00000022,0_8px_16px_#00000022] transition duration-300 will-change-transform hover:translate-x-1 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#00000022,0_8px_16px_#00000011]
            "
          />
        </section>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">{name}</h2>
            <VerifiedIcon />
          </div>
          <p className="text-sm text-neutral-300">{title}</p>
          <p className="text-sm text-neutral-400 mt-1">{description}</p>
        </div>
      </div>

      {/* Bagian Bawah: Statistik dan Tombol Follow */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-4 text-neutral-400">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-white">DKI Jakarta, IDN</span>
          </div>
        </div>

        <section className="relative inset-0">
          <div
            className="w-28 h-10 flex rounded-lg items-center space-x-2 border border-[#ff9a24] bg-[#ffe6c8]"
            style={{
              backgroundImage:
                'url(\'data:image/svg+xml,%3Csvg width="5" height="5" viewBox="0 0 5 5" stroke-width="0.5" stroke="%23ff9a24" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M-1 5L5 -1M3 6L6 3"/%3E%3C/svg%3E\')',
            }}
          />
          <Link to={"https://www.linkedin.com/in/albarms"} target="_blank" rel="noreferrer">
            <button
              className={`
                ${buttonBaseClasses} ${buttonVariantClasses[variant]}
                absolute -top-2.5 left-2.5
                shadow-[0_0_0_1px_#00000022,0_8px_16px_#00000022] transition duration-300 will-change-transform hover:translate-x-1 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#00000022,0_8px_16px_#00000011]
                `}
            >
              <Linkedin/>
              <span>Profile</span>
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default ProfileCard;

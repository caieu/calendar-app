import { Github } from "../icons/Github";
import { LinkedIn } from "../icons/LinkedIn";
import { Twitter } from "../icons/Twitter";

const navigation = [
  {
    name: "Twitter",
    href: "#",
    icon: Twitter,
  },
  {
    name: "GitHub",
    href: "https://github.com/caieu",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/caainajeronimo",
    icon: LinkedIn,
  },
];

export const Footer = () => {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-2 px-4 md:py-8 md:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-gray-500"
              target="_blank"
              rel="noreferrer"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="mt-2 md:mt-0 md:order-1">
          <p className="text-center text-base text-gray-400">
            &copy; 2021 Caainã Jerônimo
          </p>
        </div>
      </div>
    </footer>
  );
};

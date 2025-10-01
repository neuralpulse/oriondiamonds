export function Footer() {
  return (
    <div>
      <section
        id="contact"
        className="py-24 px-6 bg-gradient-to-t from-gray-50 to-transparent"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif text-[#0a1833]">Contact Us</h2>
          <p className="mt-3 text-[#0a1833]">
            Have questions or want to know more? Reach out to us anytime.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <span>
              Email:{" "}
              <a href="mailto:orionmail@example.com" className="underline">
                orionmail@example.com
              </a>
            </span>
            <span>
              Phone:{" "}
              <a href="tel:+801919119921" className="underline">
                +80 19191 19921
              </a>
            </span>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center text-[#0a1833] text-sm">
          © {new Date().getFullYear()} Orion Diamonds — All rights reserved
        </div>
      </footer>
    </div>
  );
}

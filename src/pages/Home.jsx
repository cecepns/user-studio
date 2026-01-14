import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import heroImage from "../assets/hero-banner.jpg";

const Home = () => {
  const [heroContent, setHeroContent] = useState(null);
  const [servicesContent, setServicesContent] = useState(null);
  const [serviceCards, setServiceCards] = useState([]);
  const [galleryContent, setGalleryContent] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [ctaContent, setCtaContent] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });

    fetchHeroContent();
    fetchServicesContent();
    fetchServiceCards();
    fetchGalleryContent();
    fetchGalleryImages();
    fetchCtaContent();
  }, []);

  const fetchHeroContent = async () => {
    try {
      const response = await fetch(
        "https://api-inventory.isavralabel.com/user-studio/api/content-sections/hero_section"
      );
      if (response.ok) {
        const data = await response.json();
        setHeroContent(data);
      }
    } catch (error) {
      console.error("Error fetching hero content:", error);
    }
  };

  const fetchServicesContent = async () => {
    try {
      const response = await fetch(
        "https://api-inventory.isavralabel.com/user-studio/api/content-sections/services_preview_section"
      );
      if (response.ok) {
        const data = await response.json();
        setServicesContent(data);
      }
    } catch (error) {
      console.error("Error fetching services content:", error);
    }
  };

  const fetchServiceCards = async () => {
    try {
      const response = await fetch(
        "https://api-inventory.isavralabel.com/user-studio/api/service-cards"
      );
      if (response.ok) {
        const data = await response.json();
        setServiceCards(data);
      }
    } catch (error) {
      console.error("Error fetching service cards:", error);
    }
  };

  const fetchGalleryContent = async () => {
    try {
      const response = await fetch(
        "https://api-inventory.isavralabel.com/user-studio/api/content-sections/gallery_section"
      );
      if (response.ok) {
        const data = await response.json();
        setGalleryContent(data);
      }
    } catch (error) {
      console.error("Error fetching gallery content:", error);
    }
  };

  const fetchGalleryImages = async () => {
    try {
      const response = await fetch(
        "https://api-inventory.isavralabel.com/user-studio/api/gallery/images?featured=true"
      );
      if (response.ok) {
        const data = await response.json();
        // Limit to 6 images for homepage preview
        setGalleryImages(data.slice(0, 6));
      }
    } catch (error) {
      console.error("Error fetching gallery images:", error);
    }
  };

  const fetchCtaContent = async () => {
    try {
      const response = await fetch(
        "https://api-inventory.isavralabel.com/user-studio/api/content-sections/home_cta_section"
      );
      if (response.ok) {
        const data = await response.json();
        setCtaContent(data);
      }
    } catch (error) {
      console.error("Error fetching CTA content:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>User Studio - Hari Pernikahan Sempurna Anda Menanti</title>
        <meta
          name="description"
          content="Ciptakan momen magis dengan User Studio. Layanan perencanaan pernikahan profesional untuk membuat hari spesial Anda tak terlupakan."
        />
        <meta
          name="keywords"
          content="wedding planner, wedding organizer, jakarta wedding, wedding services"
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center gradient-bg hero-pattern overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>

        <div className="container-custom relative z-10 p-4 md:px-8 pt-24 md:pt-20">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right" data-aos-delay="200">
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight">
                {heroContent ? heroContent.title : "Hari"}
                {heroContent && heroContent.subtitle ? (
                  heroContent.subtitle.split(", ").map((part, index) => (
                    <span
                      key={index}
                      className={`block ${index === 0 ? "text-gradient" : ""}`}
                    >
                      {part}
                    </span>
                  ))
                ) : (
                  <span className="text-gradient block">Pernikahan</span>
                )}
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {heroContent
                  ? heroContent.description
                  : "Buatlah Kesan Indah di Moment Pernikahanmu, dan Abadikan Setiap Moment di Hari Bahagia Mu, Libatkan Kami Untuk Mengatur Acara Bahagiamu."}
              </p>
              {heroContent && heroContent.button_text && (
                <div className="mt-8">
                  <Link
                    to={heroContent.button_url || "/contact"}
                    className="btn-primary-outline"
                  >
                    {heroContent.button_text}
                  </Link>
                </div>
              )}
            </div>

            <div className="relative" data-aos="fade-left" data-aos-delay="300">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-200 to-secondary-200 rounded-full blur-3xl opacity-30 animate-float"></div>
              <img
                src={
                  heroContent && heroContent.image_url
                    ? heroContent.image_url
                    : "https://placehold.co/600x400"
                }
                alt="Upacara pernikahan yang indah"
                className="relative z-10 w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className=" text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Mengapa Memilih User Studio?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kami membawa pengalaman bertahun-tahun dan passion untuk membuat
              hari pernikahan Anda luar biasa
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "💍",
                title: "Perencanaan Ahli",
                description:
                  "Wedding planner profesional dengan pengalaman bertahun-tahun menciptakan perayaan sempurna",
              },
              {
                icon: "🎨",
                title: "Desain Kustom",
                description:
                  "Tema dan dekorasi yang dipersonalisasi sesuai dengan visi dan gaya unik Anda",
              },
              {
                icon: "✨",
                title: "Pengalaman Bebas Stres",
                description:
                  "Kami menangani setiap detail sehingga Anda bisa fokus menikmati hari spesial",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg card-hover"
                data-aos="fade-up"
                data-aos-delay={200 + index * 200}
              >
                <div className="text-6xl mb-6">{feature.icon}</div>
                <h3 className=" text-2xl font-semibold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Gallery Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              {galleryContent ? galleryContent.title : ""}
            </h2>
            <p className="font-bold text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {galleryContent ? galleryContent.subtitle : ""}
            </p>
          </div>

          {galleryImages.length > 0 ? (
            <div
              className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto"
              data-aos="fade-up"
            >
              {galleryImages.map((image, index) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-2xl shadow-lg card-hover"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <img
                    src={image.image_url}
                    alt={image.title || "Gallery image"}
                    className="w-full h-64 md:h-96 object-cover object-center transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      {image.category_name && (
                        <span className="inline-block px-3 py-1 bg-primary-500 rounded-full text-sm font-medium mb-2">
                          {image.category_name}
                        </span>
                      )}
                      {image.title && (
                        <h3 className="text-lg font-semibold">{image.title}</h3>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">
                Tidak ada galeri tersedia saat ini.
              </p>
            </div>
          )}

          {galleryImages.length > 0 && (
            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <Link
                to="/gallery"
                className="inline-block btn-primary-outline font-medium"
              >
                Lihat Semua Galeri →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className=" text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              {servicesContent ? servicesContent.title : ""}
            </h2>
            <p className="font-bold text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {servicesContent ? servicesContent.subtitle : ""}
            </p>
          </div>

          <div
            className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto"
            data-aos="fade-up"
          >
            {serviceCards.length > 0 ? (
              serviceCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-[#f0f8ff] rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100"
                >
                  <div className="p-8 text-center">
                    <div className="text-6xl mb-6">{card.icon}</div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{card.description}</p>
                    <Link
                      to={card.button_url}
                      className="w-full text-center block btn-primary font-medium"
                    >
                      {card.button_text}
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">
                  Tidak ada service tersedia saat ini.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/20 to-secondary-900/20"></div>
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto" data-aos="fade-up">
            <h2 className="  text-3xl lg:text-5xl font-bold mb-6">
              {ctaContent ? ctaContent.title : ""}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {ctaContent ? ctaContent.description : ""}
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <Link
                to={ctaContent ? ctaContent.button_url : "/contact"}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                {ctaContent ? ctaContent.button_text : "Booking Konsultasi"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

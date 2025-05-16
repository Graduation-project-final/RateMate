import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BlogPage = () => {
  const { postId } = useParams();
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const postsPerPage = 6;

  const posts = [
    {
      id: 1,
      title: "The Evolution of Reviews in Jordanian Culture",
      image:
        "https://images.pexels.com/photos/1521377/pexels-photo-1521377.jpeg",
      excerpt:
        "Explore the rich history and development of review culture in Jordan, from traditional word-of-mouth to modern online feedback.",
      content:
        "The evolution of reviews in Jordanian culture is a fascinating journey that reflects broader social and technological changes. Historically, reviews were primarily conveyed through word-of-mouth, often shared in tight-knit communities where trust and reputation played a crucial role. With the advent of the internet and social media, the landscape of reviews underwent a dramatic transformation. Today, online platforms enable Jordanians to share their opinions and experiences with a much larger audience, influencing consumer behavior and business practices. This shift has brought both challenges and opportunities, as businesses must now navigate the complexities of online reputation management while consumers benefit from greater access to information. The cultural significance of reviews has also evolved, with online feedback becoming a valuable resource for decision-making and community building in modern Jordanian society.",
    },
    {
      id: 2,
      title: "How Jordanian Consumers Approach Online Reviews",
      image:
        "https://images.pexels.com/photos/1906810/pexels-photo-1906810.jpeg",
      excerpt:
        "Discover how Jordanians interact with online reviews and the factors influencing their trust and purchasing decisions.",
      content:
        "Jordanian consumers approach online reviews with a unique blend of skepticism and reliance. Trust is a pivotal factor, often influenced by the credibility of the reviewer and the platform hosting the review. Consumers tend to scrutinize the authenticity of reviews, looking for detailed, balanced feedback rather than overly positive or negative comments. This discerning approach helps them make informed purchasing decisions. Additionally, cultural values such as community and personal connections play a role in how reviews are perceived and trusted. The impact of online reviews on purchasing decisions is significant, with many Jordanians turning to these reviews before making a purchase, especially for high-value items. Businesses that understand and respect these nuances can build stronger relationships with their customers, fostering loyalty and trust.",
    },
    {
      id: 3,
      title: "The Impact of Social Media on Jordanian Reviews",
      image:
        "https://images.pexels.com/photos/1181335/pexels-photo-1181335.jpeg",
      excerpt:
        "Analyze how social media platforms have transformed the review landscape in Jordan and their effect on local businesses.",
      content:
        "Social media has profoundly transformed the review landscape in Jordan, creating new avenues for feedback and interaction. Platforms like Facebook, Instagram, and Twitter have become essential tools for consumers to share their experiences and opinions about products and services. This shift has made reviews more immediate and accessible, allowing businesses to receive real-time feedback and engage directly with their customers. The influence of social media on reviews is evident in the way businesses strategize their online presence, focusing on building strong, positive reputations through consistent engagement and customer satisfaction. Moreover, social media reviews often carry significant weight as they can reach a vast audience quickly, amplifying their impact on consumer behavior and business success. The integration of multimedia elements, such as photos and videos, further enhances the credibility and relatability of these reviews, making them a powerful tool in the modern Jordanian market.",
    },
    {
      id: 4,
      title: "Top Jordanian Review Websites You Should Know",
      image:
        "https://images.pexels.com/photos/1535469/pexels-photo-1535469.jpeg",
      excerpt:
        "A guide to the most popular review websites in Jordan and how they are shaping consumer choices.",
      content:
        "Jordan is home to several popular review websites that significantly influence consumer choices. These platforms provide a space for users to share detailed feedback on a wide range of products and services, from restaurants and hotels to electronics and fashion. Websites such as Jeeran, TripAdvisor, and Google Reviews are among the most trusted and widely used, offering a wealth of information for potential buyers. Each site has its unique features and user base, catering to different aspects of the market. For instance, Jeeran focuses heavily on local businesses, providing a platform for Jordanians to support and discover homegrown enterprises. In contrast, TripAdvisor is renowned for travel-related reviews, helping both locals and tourists make informed decisions about their travel plans. The influence of these websites is evident in their ability to shape consumer behavior, as positive reviews can drive significant traffic and sales to businesses, while negative feedback can prompt improvements and changes. Understanding the dynamics of these platforms is crucial for businesses looking to thrive in the competitive Jordanian market.",
    },
    {
      id: 5,
      title: "Jordanian Customer Feedback Trends in 2024",
      image:
        "https://images.pexels.com/photos/3730768/pexels-photo-3730768.jpeg",
      excerpt:
        "Explore the latest trends in customer feedback in Jordan and what they reveal about changing consumer behaviors.",
      content:
        "Customer feedback trends in Jordan for 2024 reveal significant shifts in consumer behavior and expectations. There is a growing emphasis on personalized and immediate feedback, with consumers increasingly using digital platforms to voice their opinions. This trend is driven by advancements in technology, such as mobile apps and AI-powered chatbots, which facilitate quick and efficient communication between customers and businesses. Additionally, there is a notable rise in the importance of visual feedback, with photos and videos becoming integral parts of reviews. This visual element adds authenticity and relatability, helping potential customers make better-informed decisions. Another emerging trend is the focus on ethical and sustainable practices, with consumers more likely to support businesses that demonstrate social responsibility. This shift reflects a broader global movement towards conscious consumerism, where the values and actions of a business play a crucial role in its reputation and success. Understanding these trends is essential for businesses aiming to meet the evolving needs and expectations of their customers in Jordan.",
    },
    {
      id: 6,
      title: "The Role of Trust in Jordanian Online Reviews",
      image:
        "https://images.pexels.com/photos/3560550/pexels-photo-3560550.jpeg",
      excerpt:
        "Understand the importance of trust in online reviews within Jordan and how businesses can build and maintain it.",
      content:
        "Trust is a cornerstone of online reviews in Jordan, deeply influencing consumer decisions and business reputations. For reviews to be effective, they must be perceived as honest and reliable. Jordanians place a high value on authenticity, often favoring reviews that provide detailed, balanced perspectives over those that seem excessively positive or negative. Building and maintaining trust involves transparency and consistency from businesses. Companies that openly address feedback, both positive and negative, demonstrate a commitment to customer satisfaction and continuous improvement. Furthermore, leveraging user-generated content, such as customer photos and videos, can enhance the credibility of reviews. Trust also extends to the platforms themselves; reputable review sites that implement stringent verification processes are more likely to be trusted by consumers. For businesses, fostering a culture of trust can lead to stronger customer relationships, increased loyalty, and a more robust online presence, ultimately driving growth and success in the competitive Jordanian market.",
    },
    {
      id: 8,
      title: "The Influence of Celebrity Endorsements on Jordanian Reviews",
      image:
        "https://images.pexels.com/photos/1681002/pexels-photo-1681002.jpeg",
      excerpt:
        "How do celebrity endorsements affect the credibility and effectiveness of reviews in Jordanian culture?",
      content:
        "Celebrity endorsements have a significant impact on the credibility and effectiveness of reviews in Jordanian culture. When a well-known figure endorses a product or service, it can quickly boost its popularity and perceived value. Celebrities often serve as influential opinion leaders, and their recommendations are seen as trustworthy by their followers. However, the effectiveness of such endorsements depends on the authenticity and relevance of the celebrity to the product. Endorsements that feel genuine and aligned with the celebrity's image are more likely to resonate with consumers. Conversely, inauthentic or poorly matched endorsements can backfire, leading to skepticism and distrust. Additionally, the rise of social media influencers has diversified the landscape of endorsements, with local influencers playing a crucial role in shaping consumer opinions. These influencers, often more relatable and accessible than traditional celebrities, can create a more personalized and impactful connection with their audience. For businesses, strategic collaborations with celebrities and influencers can enhance their visibility and credibility, driving engagement and sales in the Jordanian market.",
    },
    {
      id: 9,
      title: "Comparing Traditional and Modern Review Methods in Jordan",
      image:
        "https://images.pexels.com/photos/3572519/pexels-photo-3572519.jpeg",
      excerpt:
        "A deep dive into how traditional review methods compare with modern online reviews in Jordan.",
      content:
        "Traditional review methods in Jordan, such as word-of-mouth and print media, have long played a vital role in shaping consumer opinions. These methods relied heavily on personal trust and community connections, where recommendations from friends and family carried significant weight. In contrast, modern online reviews offer a broader, more diverse range of opinions accessible to anyone with an internet connection. This shift has democratized the review process, allowing more voices to be heard and providing consumers with a wealth of information to guide their decisions. However, the impersonal nature of online reviews can sometimes lead to challenges in assessing credibility and authenticity. While traditional methods fostered close-knit community trust, online platforms have introduced new dynamics of anonymity and scale. The effectiveness of each method depends on the context and the consumer's preferences. Businesses in Jordan must navigate these dual landscapes, leveraging the strengths of both traditional and modern review methods to build trust and engage with their audience effectively.",
    },
    {
      id: 10,
      title: "The Effect of Reviews on Local Jordanian Businesses",
      image:
        "https://images.pexels.com/photos/2253890/pexels-photo-2253890.jpeg",
      excerpt:
        "Investigate how reviews influence the success and reputation of local businesses in Jordan.",
      content:
        "Reviews have a profound effect on the success and reputation of local businesses in Jordan. Positive reviews can drive significant traffic and boost sales, as potential customers are more likely to trust the experiences of their peers. Conversely, negative reviews can deter potential customers and damage a business's reputation if not managed properly. The impact of reviews extends beyond immediate sales, influencing long-term brand perception and customer loyalty. Local businesses that actively engage with reviews, responding to feedback and addressing concerns, can build stronger relationships with their customers and demonstrate a commitment to quality and service. Additionally, reviews provide valuable insights into customer preferences and areas for improvement, enabling businesses to adapt and grow. In the competitive market of Jordan, where word-of-mouth and community trust play crucial roles, managing online reviews effectively is essential for maintaining a positive reputation and achieving sustained success.",
    },
    {
      id: 11,
      title: "The Future of Online Reviews in Jordan",
      image:
        "https://images.pexels.com/photos/1695730/pexels-photo-1695730.jpeg",
      excerpt:
        "What does the future hold for online reviews in Jordan? Predictions and trends shaping the review landscape.",
      content:
        "The future of online reviews in Jordan is poised for exciting developments, driven by technological advancements and evolving consumer behaviors. One significant trend is the increasing use of artificial intelligence and machine learning to analyze and curate reviews. These technologies can help filter out fake or biased reviews, providing more reliable and relevant feedback to consumers. Additionally, the integration of augmented reality (AR) and virtual reality (VR) into review platforms could offer more immersive and interactive experiences, allowing users to explore products and services in a virtual environment before making a decision. Another emerging trend is the growing importance of video reviews, as consumers seek more engaging and authentic content. Influencer marketing will continue to play a crucial role, with local influencers shaping review trends and consumer preferences. As consumers become more conscious of ethical and sustainable practices, businesses that align their values with these trends and transparently showcase their efforts through reviews are likely to gain a competitive edge. The future of online reviews in Jordan will be characterized by greater personalization, interactivity, and trust, shaping a dynamic and consumer-centric marketplace.",
    },
    {
      id: 12,
      title: "How to Leverage Reviews for Business Growth in Jordan",
      image:
        "https://images.pexels.com/photos/1180801/pexels-photo-1180801.jpeg",
      excerpt:
        "Tips and strategies for businesses in Jordan to use reviews effectively for growth and customer acquisition.",
      content:
        "Leveraging reviews for business growth in Jordan involves strategic approaches to enhance visibility, credibility, and customer engagement. One effective strategy is to actively encourage satisfied customers to leave positive reviews, creating a robust online presence that attracts potential clients. Offering incentives, such as discounts or loyalty points, can motivate customers to share their experiences. Additionally, businesses should promptly respond to reviews, both positive and negative, demonstrating a commitment to customer satisfaction and continuous improvement. Analyzing review feedback can provide valuable insights into customer preferences and pain points, guiding product and service enhancements. Collaborating with local influencers can amplify the reach and impact of reviews, as their endorsements often carry significant weight with their followers. Highlighting positive reviews on the business's website and social media platforms can also build trust and credibility. By adopting these strategies, businesses in Jordan can harness the power of reviews to drive growth, enhance customer acquisition, and strengthen their market position.",
    },
    {
      id: 16,
      title: "How to Craft Effective Reviews in Jordanian Context",
      image:
        "https://images.pexels.com/photos/3825537/pexels-photo-3825537.jpeg",
      excerpt:
        "Tips and best practices for writing reviews that resonate with Jordanian audiences.",
      content:
        "Crafting effective reviews in the Jordanian context involves understanding the cultural nuances and preferences of the local audience. Authenticity and detail are key elements that resonate well with Jordanian consumers. Providing specific examples and personal experiences can make reviews more relatable and trustworthy. It's also important to balance praise with constructive criticism, offering a well-rounded perspective that helps potential customers make informed decisions. Using clear and concise language, along with appropriate cultural references, can enhance the review's relevance and impact. Including visual elements, such as photos or videos, can further engage readers and add credibility to the review. For businesses, encouraging customers to share their honest opinions and providing a seamless review submission process can foster a positive review culture. By following these best practices, reviewers can create content that effectively communicates their experiences and influences the purchasing decisions of their fellow Jordanians.",
    },
    {
      id: 17,
      title: "Influence of Local Influencers on Review Trends in Jordan",
      image:
        "https://images.pexels.com/photos/1468074/pexels-photo-1468074.jpeg",
      excerpt:
        "Examine how local influencers are shaping review trends and consumer behavior in Jordan.",
      content:
        "Local influencers play a significant role in shaping review trends and consumer behavior in Jordan. These influencers, who often have a deep understanding of the local culture and market, can effectively communicate with their audience in a relatable and authentic manner. Their endorsements and reviews carry considerable weight, influencing the opinions and purchasing decisions of their followers. Businesses in Jordan are increasingly collaborating with local influencers to reach a broader audience and enhance their credibility. These partnerships can result in more organic and trustworthy reviews, as influencers share their genuine experiences and opinions. The impact of influencers extends beyond product reviews to shaping broader trends and consumer preferences. By highlighting emerging products, services, and lifestyle choices, influencers can drive awareness and adoption among their followers. For businesses, engaging with local influencers offers a strategic advantage in building brand awareness, trust, and loyalty in the competitive Jordanian market.",
    },
  ];

  useEffect(() => {
    const results = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(results);
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePostClick = (post) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-[#FADED9] min-h-screen ">
      <header className="bg-[#060640] text-[#FADED9] py-16 px-4 shadow-lg">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6 tracking-wide">
            RateMate Blog
          </h1>
          <p className="text-2xl mb-10 font-light">
            Discover insights on reviews and consumer trends
          </p>
          <div className="relative max-w-2xl mx-auto ">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full px-6 py-4 rounded-full text-[#515161] bg-[#FADED9] focus:outline-none focus:ring-2 focus:ring-[#060640] placeholder-[#515161] text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#515161]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 max-w-7xl">
        {!selectedPost ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {currentPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2"
                  onClick={() => handlePostClick(post)}
                >
                  <div className="relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute inset-0 bg-[#060640] bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[#FADED9] text-lg font-semibold">
                        Read More
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-[#060640] mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-[#515161] mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <button className="text-[#060640] font-semibold hover:text-[#515161] transition-colors">
                      Read Article →
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <p className="text-center text-[#515161] mt-12 text-xl">
                No articles found matching your search.
              </p>
            )}

            {filteredPosts.length > postsPerPage && (
              <div className="flex justify-center mt-16 space-x-3">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={`px-5 py-3 rounded-full text-lg font-semibold transition-colors ${
                      currentPage === index + 1
                        ? "bg-[#060640] text-[#FADED9]"
                        : "bg-[#FADED9] text-[#060640] hover:bg-[#515161] hover:text-[#FADED9]"
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <article className="bg-white rounded-xl shadow-2xl max-w-4xl mx-auto overflow-hidden">
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-10">
              <h1 className="text-4xl font-bold text-[#060640] mb-6">
                {selectedPost.title}
              </h1>
              <p className="text-[#515161] leading-relaxed mb-8 text-lg">
                {selectedPost.content}
              </p>
              <button
                className="bg-[#060640] text-[#FADED9] px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#515161] transition-colors"
                onClick={() => setSelectedPost(null)}
              >
                ← Back to Articles
              </button>
            </div>
          </article>
        )}
      </main>
    </div>
  );
};

export default BlogPage;

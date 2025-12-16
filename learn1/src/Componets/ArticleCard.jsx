import {
  Card,
  Image,
  Badge,
  Text,
  Group,
  ActionIcon,
  Flex,
  Popover,
  Tooltip,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { Eye, Bookmark, Sparkles, Copy } from "lucide-react";
import { addBookmarks, removeBookmarks } from "../redux/slice/bookmarkSlice";
import { useNavigate } from "react-router-dom"; // 🔴


const ArticleCard = ({ article, category }) => {
  const navigate = useNavigate(); // 🔴

  const dispatch = useDispatch();
  const { bookmarks } = useSelector((state) => state.bookmarks);
  const [localBookmarked, setLocalBookmarked] = useState(false);

  // const isBookmarked = bookmarks.some((item) => item.url === article.url);
  // const isBookmarked = Array.isArray(bookmarks) && article?.url   ? bookmarks.some((item) => item?.url === article?.url)
  //    : false;
  const [opened, setOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleOpenDetail = (article) => {
  if (!article._id) {
    alert("This article is not stored in local database.");
    return;
  }

  handleAddHistory(article);
  navigate(`/news/${article._id}`);
};


  useEffect(() => {
    if (Array.isArray(bookmarks) && article?.url) {
      const found = bookmarks.some(
        (item) =>
          item?.article?.url === article?.url || item?.url === article?.url
      );
      if (found !== localBookmarked) {
        setLocalBookmarked(found);
      }
    }
  }, [bookmarks, article?.url]);

  const handleBookmark = () => {
    const data = {
      article: {
        articleId: article._id,
        title: article.title,
        source: article.source?.name,
        url: article.url,
        imageUrl: article.urlToImage,
        publishedAt: article.publishedAt,
      },
    };

    //   if (isBookmarked) {
    //     dispatch(removeBookmarks(article.url));
    //   } else {
    //     dispatch(addBookmarks(data));
    //   }
    // };
    if (localBookmarked) {
      dispatch(removeBookmarks(article.url));
      setLocalBookmarked(false); // 🔴 instant UI feedback
    } else {
      dispatch(addBookmarks(data));
      setLocalBookmarked(true); // 🔴 instant UI feedback
    }
  };

  const handleSummarize = async () => {
    setOpened(true);
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ai/summarize`,
        { url: article.url }
      );
      setSummary(res.data.summary);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      className="flex flex-row gap-6"
    >
      {article.urlToImage && (
        <Image
          src={article.urlToImage}
          alt={article.title}
          h={200}
          w="auto"
          fit="contain"
          radius="md"
          className="object-cover"
          
        />
      )}

      <div className="flex-1">
        {category && (
          <Badge color="yellow" variant="light">
            {category}
          </Badge>
        )}

        <h2
          className="cursor-pointer text-xl hover:text-amber-500 hover:underline mt-2"
           onClick={() => handleOpenDetail(article)}
        >
          {article.title}
        </h2>

        <Text size="sm" color="gray" mt="sm">
          {article.description}
        </Text>

        <Group mt="md" spacing="xs">
          <Flex align="center" gap="xs">
            <Eye size={16} />
            <Text size="sm">
              {article.views || Math.floor(Math.random() * 500)}
            </Text>
          </Flex>

          {/* <Tooltip
            label={isBookmarked ? "Remove Bookmark" : "Bookmark this article"}
            withArrow
            position="top"
          >
            <ActionIcon
              onClick={handleBookmark}
              variant="outline"
              size="sm"
              color={isBookmarked ? "red" : "blue"}
            >
              <Bookmark
                size={18}
                fill={isBookmarked ? "currentColor" : "none"}
              />
            </ActionIcon>
          </Tooltip> */}
          <Tooltip
            label={
              localBookmarked ? "Remove Bookmark" : "Bookmark this article"
            }
            withArrow
            position="top"
          >
            <ActionIcon
              onClick={handleBookmark}
              variant="outline"
              size="sm"
              color={localBookmarked ? "red" : "blue"} // 🔴 color now controlled by local state
            >
              <Bookmark
                size={18}
                fill={localBookmarked ? "currentColor" : "none"}
              />
            </ActionIcon>
          </Tooltip>

          <Popover
            opened={opened}
            onChange={setOpened}
            width={isLoading ? 350 : 500}
            position="bottom"
            withArrow
            shadow="md"
          >
            <Popover.Target>
              <Tooltip label="Generate Summary" withArrow position="top">
                <ActionIcon
                  variant="gradient"
                  onClick={handleSummarize}
                  size="md"
                  color="yellow"
                  gradient={{ from: "blue", to: "cyan", deg: 330 }}
                >
                  <Sparkles size={18} />
                </ActionIcon>
              </Tooltip>
            </Popover.Target>

            <Popover.Dropdown style={{ minHeight: isLoading ? 150 : "auto" }}>
              {isLoading ? (
                <Flex align="center" justify="center" gap="sm">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Sparkles size={30} className="text-sky-500" />
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-500"
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    Generating...
                  </motion.span>
                </Flex>
              ) : (
                <motion.div>
                  {summary.split(" ").map((word, index) => (
                    <motion.span
                      key={index}
                      className="text-gray-800"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {word}{" "}
                    </motion.span>
                  ))}
                  <Flex justify="flex-end" mt="sm">
                    <Tooltip
                      label={copySuccess ? "Copied!" : "Copy summary"}
                      withArrow
                      position="top"
                    >
                      <ActionIcon
                        variant="outline"
                        size="sm"
                        color="blue"
                        onClick={handleCopy}
                      >
                        <Copy size={18} />
                      </ActionIcon>
                    </Tooltip>
                  </Flex>
                </motion.div>
              )}
            </Popover.Dropdown>
          </Popover>
        </Group>
      </div>
    </Card>
  );
};

export default ArticleCard;

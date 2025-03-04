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
} from '@mantine/core';
import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Eye, Bookmark, Sparkles, Copy } from 'lucide-react';

const ArticleCard = ({ article, category }) => {
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleSummarize = async () => {
    setOpened(true);
    setIsLoading(true);
    setError(null); // ✅ Reset error before request

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ai/summarize`, // ✅ Fixed API route
        { url: article.url }
      );
      setSummary(res.data.summary);
    } catch (error) {
      setError('Failed to generate summary. Try again.');
    }
    setIsLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder className="flex flex-row gap-6">
      {article.urlToImage && (
        <Image src={article.urlToImage} alt={article.title} radius="md" className="object-cover" />
      )}
      <div className="flex-1">
        <Badge color="yellow" variant="light">{category}</Badge>
        <h2
          className="cursor-pointer text-xl hover:text-amber-500 hover:underline mt-2"
          onClick={() => window.open(article.url, '_blank')}
        >
          {article.title}
        </h2>
        <Text size="sm" color="gray" mt="sm">{article.description}</Text>

        <Group mt="md" spacing="xs">
          <Flex align="center" gap="xs">
            <Eye size={16} />
            <Text size="sm">{article.views || Math.floor(Math.random() * 500)}</Text>
          </Flex>

          <Tooltip label="Bookmark this article" withArrow position="top">
            <ActionIcon variant="outline" size="sm" color="blue">
              <Bookmark size={18} />
            </ActionIcon>
          </Tooltip>

          <Popover opened={opened} onChange={setOpened} width={isLoading ? 350 : 500} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <Tooltip label="Generate Summary" withArrow position="top">
                <ActionIcon
                  variant="gradient"
                  onClick={handleSummarize}
                  size="md"
                  color="yellow"
                  gradient={{ from: 'blue', to: 'cyan', deg: 330 }}
                  disabled={isLoading} // ✅ Disable button when loading
                >
                  <Sparkles size={18} />
                </ActionIcon>
              </Tooltip>
            </Popover.Target>
            <Popover.Dropdown style={{ minHeight: isLoading ? 150 : 'auto' }}>
              {isLoading ? (
                <Flex align="center" justify="center" gap="sm">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Sparkles size={30} className="text-sky-500" />
                  </motion.span>
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500"
                    transition={{ repeat: Infinity, duration: 1.5 }}>
                    Generating...
                  </motion.span>
                </Flex>
              ) : error ? (
                <Text color="red">{error}</Text> // ✅ Show error if request fails
              ) : (
                <motion.div>
                  {summary.split(' ').map((word, index) => (
                    <motion.span
                      key={index}
                      className="text-gray-800"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {word}{' '}
                    </motion.span>
                  ))}
                  <Flex justify="flex-end" mt="sm">
                    <Tooltip label={copySuccess ? 'Copied!' : 'Copy summary'} withArrow position="top">
                      <ActionIcon variant="outline" size="sm" color="blue" onClick={handleCopy}>
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

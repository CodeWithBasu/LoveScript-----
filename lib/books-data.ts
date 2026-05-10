import { ReactNode } from "react";

export interface Book {
  amazon_in_product_url: string;
  title: string;
  author: string;
  published_date: string | null;
  mrp: number | null;
  genre: string;
  amazon_in_customer_rating: number;
  total_reviews: number;
  book_cover_image_url: string;
  content: string[];
}

export const bookData = {
  bookTitle: "LoveScript: Words of Wisdom",
  totalChapters: 30,
  parts: [
    {
      part: "Part 1: Timeless Quotes",
      chapters: [
        {
          id: 1,
          title: "Quote by Oscar Wilde",
          author: "Oscar Wilde",
          tags: "attributednosource, beyourself, gilbertperreira, honesty, inspirational, misattributedoscarwilde, quoteinvestigator",
          image: "love_quotes",
          content: ["Be yourself; everyone else is already taken."]
        },
        {
          id: 2,
          title: "Quote by Marilyn Monroe",
          author: "Marilyn Monroe",
          tags: "attributednosource, best, life, love, mistakes, outofcontrol, truth, worst",
          image: "love_quotes",
          content: ["I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best."]
        },
        {
          id: 3,
          title: "Quote by Albert Einstein",
          author: "Albert Einstein",
          tags: "attributednosource, humannature, humor, infinity, philosophy, science, stupidity, universe",
          image: "love_quotes",
          content: ["Two things are infinite: the universe and human stupidity; and I'm not sure about the universe."]
        },
        {
          id: 4,
          title: "Quote by Frank Zappa",
          author: "Frank Zappa",
          tags: "books, humor",
          image: "love_quotes",
          content: ["So many books, so little time."]
        },
        {
          id: 5,
          title: "Quote by Marcus Tullius Cicero",
          author: "Marcus Tullius Cicero",
          tags: "attributednosource, books, simile, soul",
          image: "love_quotes",
          content: ["A room without books is like a body without a soul."]
        },
        {
          id: 6,
          title: "Quote by Bernard M. Baruch",
          author: "Bernard M. Baruch",
          tags: "ataraxy, beyourself, confidence, fittingin, individuality, misattributeddrseuss, thosewhomatter",
          image: "love_quotes",
          content: ["Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind."]
        },
        {
          id: 7,
          title: "Quote by William W. Purkey",
          author: "William W. Purkey",
          tags: "dance, heaven, hurt, inspirational, life, love, sing",
          image: "love_quotes",
          content: ["You've gotta dance like there's nobody watching,Love like you'll never be hurt,Sing like there's nobody listening,And live like it's heaven on earth."]
        },
        {
          id: 8,
          title: "Quote by Dr. Seuss",
          author: "Dr. Seuss",
          tags: "attributednosource, dreams, love, reality, sleep",
          image: "love_quotes",
          content: ["You know you're in love when you can't fall asleep because reality is finally better than your dreams."]
        },
        {
          id: 9,
          title: "Quote by Mae West",
          author: "Mae West",
          tags: "humor, life",
          image: "love_quotes",
          content: ["You only live once, but if you do it right, once is enough."]
        },
        {
          id: 10,
          title: "Quote by Mahatma Gandhi",
          author: "Mahatma Gandhi",
          tags: "action, change, inspirational, philosophy, wish",
          image: "love_quotes",
          content: ["Be the change that you wish to see in the world."]
        },
        {
          id: 11,
          title: "Quote by Robert Frost",
          author: "Robert Frost",
          tags: "life",
          image: "love_quotes",
          content: ["In three words I can sum up everything I've learned about life: it goes on."]
        },
        {
          id: 12,
          title: "Quote by Harry Potter and the Goblet of Fire",
          author: "Harry Potter and the Goblet of Fire",
          tags: "fromcharlesbayardmitchell",
          image: "love_quotes",
          content: ["If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals."]
        },
        {
          id: 13,
          title: "Quote by Albert Camus",
          author: "Albert Camus",
          tags: "attributednosource, friends, friendship, misattributedalbertcamus",
          image: "love_quotes",
          content: ["Donâ€™t walk in front of meâ€¦ I may not followDonâ€™t walk behind meâ€¦ I may not leadWalk beside meâ€¦ just be my friend"]
        },
        {
          id: 14,
          title: "Quote by Mark Twain",
          author: "Mark Twain",
          tags: "lies, lying, memory, truth",
          image: "love_quotes",
          content: ["If you tell the truth, you don't have to remember anything."]
        },
        {
          id: 15,
          title: "Quote by The Four Loves",
          author: "The Four Loves",
          tags: "friendship",
          image: "love_quotes",
          content: ["Friendship ... is born at the moment when one man says to another \"What! You too? I thought that no one but myself . . ."]
        },
        {
          id: 16,
          title: "Quote by Maya Angelou",
          author: "Maya Angelou",
          tags: "friend, friendship, knowledge, love",
          image: "love_quotes",
          content: ["I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel."]
        },
        {
          id: 17,
          title: "Quote by Elbert Hubbard",
          author: "Elbert Hubbard",
          tags: "friend, friendship, knowledge, love",
          image: "love_quotes",
          content: ["A friend is someone who knows all about you and still loves you."]
        },
        {
          id: 18,
          title: "Quote by Oscar Wilde",
          author: "Oscar Wilde",
          tags: "life",
          image: "love_quotes",
          content: ["To live is the rarest thing in the world. Most people exist, that is all."]
        },
        {
          id: 19,
          title: "Quote by Oscar Wilde",
          author: "Oscar Wilde",
          tags: "attributednosource, enemies, forgiveness, strategy",
          image: "love_quotes",
          content: ["Always forgive your enemies; nothing annoys them so much."]
        },
        {
          id: 20,
          title: "Quote by Mahatma Gandhi",
          author: "Mahatma Gandhi",
          tags: "carpediem, education, inspirational, learning",
          image: "love_quotes",
          content: ["Live as if you were to die tomorrow. Learn as if you were to live forever."]
        },
        {
          id: 21,
          title: "Quote by A Testament of Hope: The Essential Writings and Speeches",
          author: "A Testament of Hope: The Essential Writings and Speeches",
          tags: "darkness, driveout, hate, inspirational, light, love, peace",
          image: "love_quotes",
          content: ["Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that."]
        },
        {
          id: 22,
          title: "Quote by The Perks of Being a Wallflower",
          author: "The Perks of Being a Wallflower",
          tags: "inspirational, love",
          image: "love_quotes",
          content: ["We accept the love we think we deserve."]
        },
        {
          id: 23,
          title: "Quote by Twilight of the Idols",
          author: "Twilight of the Idols",
          tags: "inspirational, music, philosophy",
          image: "love_quotes",
          content: ["Without music, life would be a mistake."]
        },
        {
          id: 24,
          title: "Quote by The Happy Prince and Other Stories",
          author: "The Happy Prince and Other Stories",
          tags: "intelligence, selfdeprecation",
          image: "love_quotes",
          content: ["I am so clever that sometimes I don't understand a single word of what I am saying."]
        },
        {
          id: 25,
          title: "Quote by Ralph Waldo Emerson",
          author: "Ralph Waldo Emerson",
          tags: "accomplishment, attributednosource, beyourself, conformity, individuality",
          image: "love_quotes",
          content: ["To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment."]
        },
        {
          id: 26,
          title: "Quote by Rob Siltanen",
          author: "Rob Siltanen",
          tags: "advertising, apple, change, commercial, computers, different, madness, misattributedapple, misattributedstevejobs, misfits, nonconformity, progressive, rebels, statusquo, thinkdifferent, troublemakers",
          image: "love_quotes",
          content: ["Here's to the crazy ones. The misfits. The rebels. The troublemakers. The round pegs in the square holes. The ones who see things differently. They're not fond of rules. And they have no respect for the status quo. You can quote them, disagree with them, glorify or vilify them. About the only thing you can't do is ignore them. Because they change things. They push the human race forward. And while some may see them as the crazy ones, we see genius. Because the people who are crazy enough to think they can change the world, are the ones who do."]
        },
        {
          id: 27,
          title: "Quote by Narcotics Anonymous",
          author: "Narcotics Anonymous",
          tags: "humor, insanity, life, misattributedbenfranklin, misattributedmarktwain, misattributedtoeinstein",
          image: "love_quotes",
          content: ["Insanity is doing the same thing, over and over again, but expecting different results."]
        },
        {
          id: 28,
          title: "Quote by Marilyn Monroe",
          author: "Marilyn Monroe",
          tags: "attributednosource, misattributedmarilynmonroe",
          image: "love_quotes",
          content: ["I believe that everything happens for a reason. People change so that you can learn to let go, things go wrong so that you appreciate them when they're right, you believe lies so you eventually learn to trust no one but yourself, and sometimes good things fall apart so better things can fall together."]
        },
        {
          id: 29,
          title: "Quote by Autumn Leaves",
          author: "Autumn Leaves",
          tags: "life, love",
          image: "love_quotes",
          content: ["It is better to be hated for what you are than to be loved for what you are not."]
        },
        {
          id: 30,
          title: "Quote by P.S. I Love You",
          author: "P.S. I Love You",
          tags: "actions, disappointed, disappointment, dream, dreams, explore, misattributedmarktwain, sail",
          image: "love_quotes",
          content: ["Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover."]
        }
      ]
    }
  ]
};

export const books: Book[] = [];
bookData.parts.forEach((partObj) => {
  partObj.chapters.forEach((chapter) => {
    books.push({
      amazon_in_product_url: "#",
      title: `${chapter.id}. ${chapter.title}`,
      author: chapter.author,
      published_date: "Timeless",
      mrp: null,
      genre: `Quote | ${chapter.tags.split(',')[0] || "Wisdom"}`,
      amazon_in_customer_rating: 5.0,
      total_reviews: 1000 + chapter.id * 100,
      book_cover_image_url: "/images/love_quotes.png",
      content: chapter.content
    });
  });
});

export const genres = [...new Set(books.map((book) => book.genre))];

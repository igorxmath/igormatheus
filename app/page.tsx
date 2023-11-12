import { Check, GitHub, Instagram, Mail, Twitter } from '@/components/icons'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star } from '@/components/icons'
import { Button } from '@/components/ui/button'
import type { Repository } from '@/utils/types'
import Image from 'next/image'
import Link from 'next/link'
import { getAllPosts } from '../utils/getAllPosts'

export const runtime = 'edge'

const socials = [
  {
    label: 'GitHub',
    icon: GitHub,
    href: 'https://github.com/igorxmath/',
  },
  {
    label: 'Instagram',
    icon: Instagram,
    href: 'https://instagram.com/igor.matheus',
  },
  {
    label: 'Twitter',
    icon: Twitter,
    href: 'https://twitter.com/devigormatheus',
  },
  {
    label: 'E-mail',
    icon: Mail,
    href: 'mailto:pessoal@igormatheus.com.br',
  },
]

export default async function Home() {
  const repos: Repository[] = await fetch(
    'https://api.github.com/users/igorxmath/repos',
    {
      headers: {
        authorization: process.env.GITHUB_TOKEN as string,
      },
      next: { revalidate: 3600 },
    },
  ).then((res) => res.json())

  const allPosts = await getAllPosts()

  return (
    <div className='space-y-6'>
      <div className='flex flex-col items-center space-y-2'>
        <Image
          className='rounded-full'
          src={'/avatar.jpeg'}
          alt='IM'
          height={100}
          width={100}
        />
        <div className='flex items-center space-x-1'>
          <p className='text-2xl font-extrabold sm:text-2xl'>Igor Matheus</p>
          <Check className='h-6 w-6 fill-blue-500' />
        </div>
        <p className='text-center'>
          Brazilian web developer. Passionate about modern tech, Stars finding
          solutions to solve complex problems.
        </p>
        <div className='space-x-2'>
          {socials.map((social, i) => (
            <Button
              key={i}
              size={'sm'}
              variant={'secondary'}
              asChild
            >
              <a
                href={social.href}
                target='_blank'
              >
                <social.icon
                  className='h-5 w-5'
                  aria-label={social.label}
                />
              </a>
            </Button>
          ))}
        </div>
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        {repos.map((repo) => (
          <a
            href={repo.html_url}
            target='_blank'
            key={repo.id}
          >
            <Card className='transition-all hover:border-primary/50'>
              <CardHeader>
                <CardTitle>{repo.name}</CardTitle>
                <CardDescription>{repo.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Badge
                  className='items-center'
                  variant={'default'}
                >
                  <p>{repo.language}</p>
                </Badge>
                <Badge
                  className='ml-auto flex items-center'
                  variant={'outline'}
                >
                  <Star className='mr-1 h-5 w-5 text-yellow-400' />
                  {repo.stargazers_count}
                </Badge>
              </CardFooter>
            </Card>
          </a>
        ))}
      </div>
      <div className='space-y-4'>
      {allPosts.map((post, idx) => (
          <article
            className='border-l-2 transition-all hover:border-primary/50'
            key={idx}
          >
            <div className='ml-2.5'>
              <Link
                href={`/posts/${post.slug}`}
                className='text-lg font-semibold'
              >
                <h2 className='flex items-center'>{post.metadata.title}</h2>
              </Link>
              <p className='line-clamp-1 text-sm text-muted-foreground'>
                {post.metadata.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

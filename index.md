---
layout: default
title: Home
---

# Welcome to My Bible Blog

This is a simple blog that I made for the purpose of keeping up with my reading plan and to just have a place to store my notes.

{% include plan.html %}

# Latest Posts

{% for post in site.posts limit:4 %}
  - **[{{ post.title }}]({{ post.url | relative_url }})**
  - *{{ post.subtitle }}*
  - *{{ post.date | date: "%B %d, %Y" }}*  
    {{ post.excerpt }}

{% endfor %}

[View all posts →]({{ "/posts/" | relative_url }})

If you would like to check out my other Bible site where you can read the Bible and follow along with my reading plan, you can [click here.](https://zach-and-mickey.github.io/bible-app)

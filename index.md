---
layout: default
title: Home
---

# Welcome to My Bible Blog

This is a simple blog that I made for the purpose of forcing me to keep up with my reading plan. I also think it will be interesting this time next year to go back and see how the Lord has been working in my life.

# Latest Posts

{% for post in site.posts %}
  - **[{{ post.title }}]({{ post.url | relative_url }})**  
    *{{ post.date | date: "%B %d, %Y" }}*  
    {{ post.excerpt }}   <a href="{{ post.url | relative_url }}">Read the full post</a>

{% endfor %}

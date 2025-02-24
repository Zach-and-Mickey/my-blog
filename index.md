---
layout: default
title: Home
---

# Welcome to My Jekyll Blog

This is a simple blog built with Jekyll and hosted on GitHub Pages. You can create posts, pages, and customize your site by editing the files in this repository.

# Latest Posts

{% for post in site.posts %}
  - **[{{ post.title }}]({{ post.url | relative_url }})**  
    *{{ post.date | date: "%B %d, %Y" }}*  
    {{ post.excerpt }}   <a href="{{ post.url | relative_url }}">Read the full post</a>

{% endfor %}

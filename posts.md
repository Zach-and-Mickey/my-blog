---
layout: default
title: All Posts
permalink: /posts/
---

# All Posts

{% for post in site.posts %}
  - **[{{ post.title }}]({{ post.url | relative_url }})**
  - *{{ post.subtitle }}*
  - *{{ post.date | date: "%B %d, %Y" }}*  
    {{ post.excerpt }}
{% endfor %}


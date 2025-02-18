---
layout: default
---

#Welcome to my Bible blog!
This is my new website powered by Jekyll and hosted on GitHub Pages!

Check out my first blog post:

{% for post in site.posts %}
  * [{{ post.title }}]({{ post.url }})
{% endfor %}

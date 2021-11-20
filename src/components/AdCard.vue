<template>
    <a href="#">
            <div class="related_posts__card">
              <div class="card__background" :style="'background-image: url('+background_image_url+');'"></div>
              <div class="card__title">{{title}}</div>
            </div>
          </a>
</template>

<script>
export default {
    props:['title','background_image_url']
}
</script>
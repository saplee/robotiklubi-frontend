<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Wiki</template>

    Robotiklubi
    <a href="https://wiki.robotiklubi.ee/" target="_blank" rel="noopener">ametlikust wikist</a>
    leiad kõik vajaliku klubist.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Inseneriteenused</template>

    Robotiklubi pakub inseneriteenuseid, mis on suunatud robotitele, arvutitele ja muudele elektroonilistele seadmetele.
    Teenused on saadaval nii TTÜ tudengitele kui ka kõigile teistele. Huvi korral
    <a href="mailto:leo.muiste@robotiklubi.ee">kirjuta meile!</a>.

  </WelcomeItem>

<!--  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Ecosystem</template>

    Get official tools and libraries for your project:
    <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>,
    <a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router</a>,
    <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener">Vue Test Utils</a>, and
    <a href="https://github.com/vuejs/devtools" target="_blank" rel="noopener">Vue Dev Tools</a>. If
    you need more resources, we suggest paying
    <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">Awesome Vue</a>
    a visit.
  </WelcomeItem>-->

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Suhtlus</template>

    Vajad abi? Kirjuta meile
    <a href="https://facebook.com/robotiklubi" target="_blank" rel="noopener">Facebookis</a>, meie ametilikul lehel
    või jälgi meid <a href="https://instagram.com/robotiklubi" target="_blank" rel="noopener">Instagrammis</a>.

  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Toeta meid</template>

    Robotiklubi on MTÜ ning meie tegevus sõltub suurel määral teie toetusest. Kui soovid meid toetada, siis
    <a href="mailto:robotiklubi@robotiklubi.ee">kirjuta meile!</a>
  </WelcomeItem>
</template>

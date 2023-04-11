<script setup lang="ts">
let activeItem = null
const select = (v) => {
  activeItem = v
}
</script>

<template>
  <div class="mu-box mu-bg-normal">
    <div class="mu-box justify-around" layout="flex" padding="1x">
      <mu-button>NORMAL</mu-button>
      <mu-button button-style="text">
        TEXT
      </mu-button>
      <mu-button button-style="outline">
        OUTLINE
      </mu-button>
      <mu-button button-style="link">
        LINK
      </mu-button>
      <mu-button active>
        ACTIVE
      </mu-button>
      <mu-button button-style="link" disabled>
        DISABLED
      </mu-button>
      <mu-button disabled>
        DISABLED
      </mu-button>
    </div>
    <div class="mu-box justify-around" layout="flex" padding="1x">
      <mu-button primary>
        NORMAL
      </mu-button>
      <mu-button primary button-style="text">
        TEXT
      </mu-button>
      <mu-button primary button-style="outline">
        OUTLINE
      </mu-button>
      <mu-button primary button-style="link">
        LINK
      </mu-button>
      <mu-button primary active>
        ACTIVE
      </mu-button>
      <mu-button primary button-style="link" disabled>
        DISABLED
      </mu-button>
      <mu-button primary disabled>
        DISABLED
      </mu-button>
    </div>
    <div class="mu-box justify-around" layout="flex" padding="1x">
      <mu-button secondary>
        NORMAL
      </mu-button>
      <mu-button secondary button-style="text">
        TEXT
      </mu-button>
      <mu-button secondary button-style="outline">
        OUTLINE
      </mu-button>
      <mu-button secondary button-style="link">
        LINK
      </mu-button>
      <mu-button secondary active>
        ACTIVE
      </mu-button>
      <mu-button secondary button-style="link" disabled>
        DISABLED
      </mu-button>
      <mu-button secondary disabled>
        DISABLED
      </mu-button>
    </div>
    <div class="mu-box justify-around" layout="flex" padding="1x">
      <mu-button danger>
        NORMAL
      </mu-button>
      <mu-button danger button-style="text">
        TEXT
      </mu-button>
      <mu-button danger button-style="outline">
        OUTLINE
      </mu-button>
      <mu-button danger button-style="link">
        LINK
      </mu-button>
      <mu-button danger active>
        ACTIVE
      </mu-button>
      <mu-button danger button-style="link" disabled>
        DISABLED
      </mu-button>
      <mu-button danger disabled>
        DISABLED
      </mu-button>
    </div>
    <div class="mu-box justify-around" layout="flex" flex-wrap padding="1x">
      <mu-button x-color="gray">
        GRAY
      </mu-button>
      <mu-button x-color="red">
        RED
      </mu-button>
      <mu-button x-color="pink">
        PINK
      </mu-button>
      <mu-button x-color="grape">
        GRAPE
      </mu-button>
      <mu-button x-color="violet">
        VIOLET
      </mu-button>
      <mu-button x-color="indigo">
        INDIGO
      </mu-button>
      <mu-button x-color="blue">
        BLUE
      </mu-button>
      <div class="mu-space" />
      <mu-button x-color="cyan">
        CYAN
      </mu-button>
      <mu-button x-color="teal">
        TEAL
      </mu-button>
      <mu-button x-color="green">
        GREEN
      </mu-button>
      <mu-button x-color="lime">
        LIME
      </mu-button>
      <mu-button x-color="yellow">
        YELLOW
      </mu-button>
      <mu-button x-color="orange">
        ORANGE
      </mu-button>
    </div>
    <div class="mu-box justify-around" layout="flex" padding="1x">
      <mu-button><span>badge</span><span class="mu-badge">1</span></mu-button>
      <mu-button><span>badge</span><span class="mu-badge" primary>2</span></mu-button>
      <mu-button><span>badge</span><span class="mu-badge" secondary>3</span></mu-button>
      <mu-button><span>badge</span><span class="mu-badge" warning>4</span></mu-button>
      <mu-button><span>badge</span><span class="mu-badge" danger>5</span></mu-button>
    </div>
    <div class="mu-box justify-around" layout="flex" flex-wrap padding="1x">
      <mu-button-group width="400">
        <mu-button :active="activeItem === 1" @click="select(1)">
          One
        </mu-button>
        <mu-button :active="activeItem === 2" @click="select(2)">
          Two
        </mu-button>
        <mu-button :active="activeItem === 3" @click="select(3)">
          Three
        </mu-button>
      </mu-button-group>
      <mu-button-group primary width="400">
        <mu-button :active="activeItem === 1" @click="select(1)">
          One
        </mu-button>
        <mu-button :active="activeItem === 2" @click="select(2)">
          Two
        </mu-button>
        <mu-button :active="activeItem === 3" @click="select(3)">
          Three
        </mu-button>
      </mu-button-group>
      <div class="mu-space" />
      <mu-button-group x-color="cyan" width="300" round>
        <mu-button :active="activeItem === 1" @click="select(1)">
          One
        </mu-button>
        <mu-button :active="activeItem === 2" @click="select(2)">
          Two
        </mu-button>
        <mu-button :active="activeItem === 3" @click="select(3)">
          Three
        </mu-button>
      </mu-button-group>
      <mu-button-group danger width="300" round>
        <mu-button :active="activeItem === 1" @click="select(1)">
          One
        </mu-button>
        <mu-button :active="activeItem === 2" @click="select(2)">
          Two
        </mu-button>
        <mu-button :active="activeItem === 3" @click="select(3)">
          Three
        </mu-button>
      </mu-button-group>
      <mu-button-group width="300" height="60px" disabled>
        <mu-button :active="activeItem === 1" @click="select(1)">
          One
        </mu-button>
        <mu-button :active="activeItem === 2" @click="select(2)">
          Two
        </mu-button>
        <mu-button :active="activeItem === 3" @click="select(3)">
          Three
        </mu-button>
      </mu-button-group>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  title: bar
  parentId: mussel-doc
  name: bar
  layout: index
  description: bar
</route>

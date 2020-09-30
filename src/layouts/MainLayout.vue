<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar :class="$q.dark.isActive ? 'bg-blue-grey-10 text-white' : ''">
        <q-toolbar-title>
          Tepsi
        </q-toolbar-title>
        <div>
          <q-toggle
            :value="$q.dark.isActive"
            @input="$q.dark.set($event)"
            label="Karanlık Mod"
            :color="$q.dark.isActive ? 'black' : 'black'"
            keep-color
            left-label
          />
          {{ $store.state.tableName }}
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return {};
  }
};
</script>

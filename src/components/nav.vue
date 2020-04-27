<template>
    <div class="fixed-top" :class="[$style.component]">
        <nav :id="$style.menu" class="navbar navbar-dark navbar-expand-lg">
            <ul class="navbar-nav mr-auto mx-2">
                <li class="nav-item">
                    <router-link class="nav-link p-0" to="/">
                        <span><img class="navbar-brand"
                                   src="assets/icons/favicon-48x48.svg"
                                   alt="Assetto Corsa Competizione"
                                   :style="{
                                       'max-height': '40px',
                                       'object-fit': 'contain',
                                   }"/>Server Manager</span>
                    </router-link>
                </li>
            </ul>
            <button class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#menu-dropdown">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div id="menu-dropdown" class="navbar-collapse collapse">
                <div class="mr-auto"></div>
                <ul class="navbar-nav" v-if="isLoggedIn">
                    <li v-for="item in menu" :class="['nav-item'].concat(item.items ? ['dropdown'] : [])">
                        <router-link v-if="!item.items" class="nav-link" :to="item.href">{{ item.name }}
                        </router-link>
                        <span v-if="item.items"
                              class="nav-link dropdown-toggle"
                              role="button"
                              data-toggle="dropdown">
                        {{ item.name }}
                    </span>
                        <div v-if="item.items"
                             class="bg-primary dropdown-menu">
                            <router-link v-for="childItem in item.items" v-bind:key="childItem.name"
                                         class="dropdown-item"
                                         :to="childItem.href">{{ childItem.name }}
                            </router-link>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<!--suppress JSUnusedGlobalSymbols -->
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import { RouteConfig } from 'vue-router'
    import { titleCase } from 'change-case'

    @Component
    export default class NavComponent extends Vue {
        public created() {
            const id = this.$style.menu

            $(document).on('click', function () {
                $(`#${id} .navbar-collapse.show`).collapse('hide')
            })
        }

        protected get isLoggedIn(): boolean {
            return this.$store.state.user !== null
        }

        protected get menu(): object[] {
            // @ts-ignore
            const routes: RouteConfig[] = this.$router.options.routes

            return routes.reduce((routes, route) => {
                if (route.meta?.showInNav) {
                    routes.push({
                        name: route.meta?.title || titleCase(route.name!),
                        href: this.$router.resolve(route.name!).location,
                    })
                }
                return routes
            }, [] as any)
        }
    }
</script>

<style scoped lang="scss">
    @import "styles/env";

    .dropdown-menu {
        background: inherit;
        border: none;
    }

    .dropdown-item {
        background-color: transparent;
        color: rgba(255, 255, 255, 0.5);

        &:hover {
            color: rgba(255, 255, 255, 0.75);
        }
    }

    @include media-breakpoint-down(md) {
        #menu-dropdown .nav-item {
            margin-bottom: 0.5rem;

            &:first-child {
                margin-top: 1.25rem;
            }
        }
    }

    @include media-breakpoint-up(lg) {
        .dropdown > .dropdown-menu {
            margin-top: -0.75rem;
            padding-top: 0.75rem;
        }

        .dropdown:hover > .dropdown-menu {
            display: block;
        }
    }

    .nav-item {
        cursor: pointer;
    }

    .nav-item.dropdown:hover {
        color: rgba(255, 255, 255, 0.75);
    }
</style>

<style module lang="scss">
    @import "styles/env";

    .component {
        background: $black;
    }
</style>

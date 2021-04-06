<template>
  <div class="friend-list">
    <b-card
      :title='listName'
      img-top
      tag="article"
      class="mb-2 w-100">
      <b-list-group>
        <b-list-group-item v-for='friend in friendsData' :key="friend.id">
          {{ friend.name }} {{ friend.lastname }}
          <span :is="buttonList" :user="friend"></span>
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </div>
</template>
<script>
  import mutualFriendsButtonGroup from './buttonGroups/mutualFriendsButtonGroup';
  import myFriendsButtonGroup from './buttonGroups/myFriendsButtonGroup';
export default {
  components: {
      mutualFriendsButtonGroup, myFriendsButtonGroup
  },
  props: {
    friends: {required: true},
    listName: {},
    buttonList: {required: true}
  },
  name: 'friend-list',
  data() {
    return {
      msg:'Friend',
      loader: true,
    }
  },
  computed: {
    friendsData() {
      return this.friends.data;
    }
  }
}
</script>

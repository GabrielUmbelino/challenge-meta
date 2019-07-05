export default {
  functional: true,
  props: {
    searching: {
      type: Boolean,
      default: () => false
    }
  },
  render(h, {props, listeners}) {
    const searchInput = <v-text-field
      input={props.term}
      onInput={listeners.change}
      placeholder="Search by chassis Id"/>
    return (
      <v-toolbar color="cyan" dark>
        <v-toolbar-side-icon>
          <v-icon  onClick={listeners.add}>add</v-icon>
        </v-toolbar-side-icon>
        <v-toolbar-title>
          {
            props.searching ? searchInput : 'Vehicles'
          }
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon onClick={listeners.search}>
          {
            props.searching ? 'close' : 'search'
          }
          </v-icon>
        </v-btn>
      </v-toolbar>
    )
  }
}
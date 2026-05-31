/**
 * Clan register structure — names are not invented here.
 * Verified clan rows will be published by the Royal Office when supplied.
 */

export const clansIntroduction = {
  title: "Clans, Lineage and the People of Luapula",
  deck:
    "Clans carry memory, marriage law, ceremony duty, and community representation under the Mwata Kazembe. The clan register is maintained under the authority of the Office of the Mwata Kazembe as a living record of lineage, identity, and community standing within the Kingdom.",
  roles: [
    {
      title: "Custodians of identity",
      body: "Clans bind villages to lineage memory, burial obligation, and the language of kinship spoken at court and in ceremony."
    },
    {
      title: "Governance and tribute",
      body: "Headmen and clan representatives link communities to the royal seat for land matters, dispute resolution, and public order."
    },
    {
      title: "Ceremony",
      body: "Clan elders and royal women participate in Umutomboko as part of the wider Lunda-Kazembe public ritual calendar."
    }
  ]
};

/** Registry rows: only publish names when verified with the Royal Office */
export const clanRegistry = [];

export const clanRegistryNote =
  "The verified clan register is maintained by the Office of the Mwata Kazembe. Submissions and corrections are directed to the Royal Protocol Office at Mwansabombwe.";

export const royalFamilyOffices = [
  {
    title: "Office of the Mwata",
    function: "Supreme traditional authority, ceremony, and public leadership."
  },
  {
    title: "Royal Household",
    function: "Palace officers, regalia custodians, and domestic protocol at Ichota and the royal compound."
  },
  {
    title: "Royal Women and Senior Titleholders",
    function:
      "Chieftainesses, princesses, and senior royal titleholders carry ceremonial roles within the Kingdom, including participation at Umutomboko and representation in official Kingdom gatherings."
  }
];

/**
 * Clan register structure — names are not invented here.
 * Verified clan rows will be published by the Royal Office when supplied.
 */

export const clansIntroduction = {
  title: "Clans, Lineage and the People of Luapula",
  deck:
    "Clans carry memory, marriage law, ceremony duty, and community representation under the Mwata Kazembe. This register is structured for official verification before publication as a definitive roll.",
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

/** Registry rows: only publish names when verified — structure demonstrates official format */
export const clanRegistry = [
  {
    id: "pending-1",
    clanName: null,
    clanHead: null,
    area: "Luapula Valley communities under Kazembe authority",
    ceremonyRole: "To be confirmed with the Royal Office",
    governanceRole: "Community representation to the royal seat",
    verification: "pending_official_register"
  }
];

export const clanRegistryNote =
  "The verified clan register is to be published by the Office of the Mwata Kazembe. Corrections and submissions should be directed through the Royal Protocol Office once contact channels are confirmed.";

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
      "Chieftainesses, princesses, and senior royal participants in ceremony — including documented roles at Umutomboko (e.g. Chieftainess Lukwesa in 2017 press coverage)."
  }
];

// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

type PageDocumentDataSlicesSlice =
  | ContactFormSlice
  | IFrameSlice
  | FaqSlice
  | ArchiveSlice
  | LatestNewsSlice
  | SectionSlice
  | ContentCardsSlice
  | ContentcardSlice;

/**
 * Content for Pagina documents
 */
interface PageDocumentData {
  /**
   * Titel field in *Pagina*
   *
   * - **Field Type**: Title
   * - **Placeholder**: Pagina naam
   * - **API ID Path**: page.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  title: prismic.TitleField;

  /**
   * Prioriteit field in *Pagina*
   *
   * - **Field Type**: Number
   * - **Placeholder**: Plek in het menu (links > rechts)
   * - **API ID Path**: page.order
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#number
   */
  order: prismic.NumberField;

  /**
   * Hoofdpagina field in *Pagina*
   *
   * - **Field Type**: Content Relationship
   * - **Placeholder**: *None*
   * - **API ID Path**: page.parent
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  parent: prismic.ContentRelationshipField<"page">;

  /**
   * Orientatie field in *Pagina*
   *
   * - **Field Type**: Select
   * - **Placeholder**: Horizontaal (landscape) of Verticaal (letter)
   * - **Default Value**: Letter
   * - **API ID Path**: page.orientation
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#select
   */
  orientation: prismic.SelectField<"Letter" | "Landscape", "filled">;

  /**
   * Slice Zone field in *Pagina*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: page.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<PageDocumentDataSlicesSlice> /**
   * Meta Title field in *Pagina*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: page.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Pagina*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: page.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Pagina*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: page.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Pagina document from Prismic
 *
 * - **API ID**: `page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PageDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<Simplify<PageDocumentData>, "page", Lang>;

type PostDocumentDataSlicesSlice = never;

/**
 * Content for Nieuwsbrief documents
 */
interface PostDocumentData {
  /**
   * Foto field in *Nieuwsbrief*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: post.image
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image: prismic.ImageField<never>;

  /**
   * Titel field in *Nieuwsbrief*
   *
   * - **Field Type**: Title
   * - **Placeholder**: Titel
   * - **API ID Path**: post.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  title: prismic.TitleField;

  /**
   * Inhoud field in *Nieuwsbrief*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Inhoud
   * - **API ID Path**: post.body
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  body: prismic.RichTextField;

  /**
   * Slice Zone field in *Nieuwsbrief*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: post.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<PostDocumentDataSlicesSlice>;
}

/**
 * Nieuwsbrief document from Prismic
 *
 * - **API ID**: `post`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PostDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<Simplify<PostDocumentData>, "post", Lang>;

type RouteDocumentDataSlicesSlice = never;

/**
 * Content for Fietsroute documents
 */
interface RouteDocumentData {
  /**
   * Titel field in *Fietsroute*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Titel
   * - **API ID Path**: route.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Afstand field in *Fietsroute*
   *
   * - **Field Type**: Number
   * - **Placeholder**: Afstand in km, noteer zo: 5.3
   * - **API ID Path**: route.distance
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#number
   */
  distance: prismic.NumberField;

  /**
   * Beschrijving field in *Fietsroute*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Korte beschrijving
   * - **API ID Path**: route.body
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  body: prismic.KeyTextField;

  /**
   * Fietsknoop Route field in *Fietsroute*
   *
   * - **Field Type**: Link to Media
   * - **Placeholder**: GPX van de Fietsknoop app toevoegen
   * - **API ID Path**: route.download_route
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  download_route: prismic.LinkToMediaField;

  /**
   * Route field in *Fietsroute*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: route.route
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  route: prismic.ImageField<never>;

  /**
   * QR Code field in *Fietsroute*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: route.qr_code
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  qr_code: prismic.ImageField<never>;

  /**
   * Route Link field in *Fietsroute*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: route.route_link
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  route_link: prismic.LinkField;

  /**
   * Slice Zone field in *Fietsroute*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: route.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<RouteDocumentDataSlicesSlice>;
}

/**
 * Fietsroute document from Prismic
 *
 * - **API ID**: `route`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type RouteDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<Simplify<RouteDocumentData>, "route", Lang>;

/**
 * Item in *Social → Social Media Bron*
 */
export interface SocialDocumentDataSocialItemItem {
  /**
   * Icon SVG field in *Social → Social Media Bron*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Plaats de <svg></svg> inhoud voor een icon
   * - **API ID Path**: social.social_item[].icon
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  icon: prismic.RichTextField;

  /**
   * Link field in *Social → Social Media Bron*
   *
   * - **Field Type**: Link
   * - **Placeholder**: Social media website url
   * - **API ID Path**: social.social_item[].link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  link: prismic.LinkField;
}

/**
 * Content for Social documents
 */
interface SocialDocumentData {
  /**
   * Social Media Bron field in *Social*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: social.social_item[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  social_item: prismic.GroupField<Simplify<SocialDocumentDataSocialItemItem>>;
}

/**
 * Social document from Prismic
 *
 * - **API ID**: `social`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SocialDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<SocialDocumentData>,
    "social",
    Lang
  >;

export type AllDocumentTypes =
  | PageDocument
  | PostDocument
  | RouteDocument
  | SocialDocument;

/**
 * Default variation for Archive Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ArchiveSliceDefault = prismic.SharedSliceVariation<
  "default",
  Record<string, never>,
  never
>;

/**
 * Automatic variation for Archive Slice
 *
 * - **API ID**: `automatic`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ArchiveSliceAutomatic = prismic.SharedSliceVariation<
  "automatic",
  Record<string, never>,
  never
>;

/**
 * Slice variation for *Archive*
 */
type ArchiveSliceVariation = ArchiveSliceDefault | ArchiveSliceAutomatic;

/**
 * Archive Shared Slice
 *
 * - **API ID**: `archive`
 * - **Description**: Archive
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ArchiveSlice = prismic.SharedSlice<
  "archive",
  ArchiveSliceVariation
>;

/**
 * Primary content in *ContactForm → Default → Primary*
 */
export interface ContactFormSliceDefaultPrimary {
  /**
   * Begeleidende tekst field in *ContactForm → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Begeleidende tekst
   * - **API ID Path**: contact_form.default.primary.body
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  body: prismic.RichTextField;
}

/**
 * Default variation for ContactForm Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ContactFormSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<ContactFormSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *ContactForm*
 */
type ContactFormSliceVariation = ContactFormSliceDefault;

/**
 * ContactForm Shared Slice
 *
 * - **API ID**: `contact_form`
 * - **Description**: ContactForm
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ContactFormSlice = prismic.SharedSlice<
  "contact_form",
  ContactFormSliceVariation
>;

/**
 * Item in *ContentCards → NewsCards → Primary → Card*
 */
export interface ContentCardsSliceDefaultPrimaryCardItem {
  /**
   * Foto field in *ContentCards → NewsCards → Primary → Card*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: content_cards.default.primary.card[].image
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image: prismic.ImageField<"md">;

  /**
   * Datum field in *ContentCards → NewsCards → Primary → Card*
   *
   * - **Field Type**: Date
   * - **Placeholder**: Datum
   * - **API ID Path**: content_cards.default.primary.card[].date
   * - **Documentation**: https://prismic.io/docs/field#date
   */
  date: prismic.DateField;

  /**
   * Titel field in *ContentCards → NewsCards → Primary → Card*
   *
   * - **Field Type**: Title
   * - **Placeholder**: Titel
   * - **API ID Path**: content_cards.default.primary.card[].title
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  title: prismic.TitleField;

  /**
   * Inhoud field in *ContentCards → NewsCards → Primary → Card*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Inhoud
   * - **API ID Path**: content_cards.default.primary.card[].body
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  body: prismic.KeyTextField;

  /**
   * Hyperlink field in *ContentCards → NewsCards → Primary → Card*
   *
   * - **Field Type**: Link
   * - **Placeholder**: Hyperlink
   * - **API ID Path**: content_cards.default.primary.card[].link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  link: prismic.LinkField;
}

/**
 * Item in *ContentCards → GuestCards → Primary → Card*
 */
export interface ContentCardsSliceGuestCardsPrimaryCardItem {
  /**
   * Foto field in *ContentCards → GuestCards → Primary → Card*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: content_cards.guestCards.primary.card[].image
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image: prismic.ImageField<"md">;

  /**
   * Datum field in *ContentCards → GuestCards → Primary → Card*
   *
   * - **Field Type**: Date
   * - **Placeholder**: Datum
   * - **API ID Path**: content_cards.guestCards.primary.card[].date
   * - **Documentation**: https://prismic.io/docs/field#date
   */
  date: prismic.DateField;

  /**
   * Titel field in *ContentCards → GuestCards → Primary → Card*
   *
   * - **Field Type**: Title
   * - **Placeholder**: Titel
   * - **API ID Path**: content_cards.guestCards.primary.card[].title
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  title: prismic.TitleField;

  /**
   * Inhoud field in *ContentCards → GuestCards → Primary → Card*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Inhoud
   * - **API ID Path**: content_cards.guestCards.primary.card[].body
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  body: prismic.KeyTextField;
}

/**
 * Item in *ContentCards → RoleCards → Primary → Card*
 */
export interface ContentCardsSliceRoleCardsPrimaryCardItem {
  /**
   * Foto field in *ContentCards → RoleCards → Primary → Card*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: content_cards.roleCards.primary.card[].image
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image: prismic.ImageField<never>;

  /**
   * Titel field in *ContentCards → RoleCards → Primary → Card*
   *
   * - **Field Type**: Title
   * - **Placeholder**: Titel
   * - **API ID Path**: content_cards.roleCards.primary.card[].title
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  title: prismic.TitleField;

  /**
   * Subtitel field in *ContentCards → RoleCards → Primary → Card*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Maximaal 28 karakters
   * - **API ID Path**: content_cards.roleCards.primary.card[].subtitle
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  subtitle: prismic.KeyTextField;

  /**
   * Inhoud field in *ContentCards → RoleCards → Primary → Card*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Inhoud
   * - **API ID Path**: content_cards.roleCards.primary.card[].body
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  body: prismic.KeyTextField;
}

/**
 * Primary content in *ContentCards → NewsCards → Primary*
 */
export interface ContentCardsSliceDefaultPrimary {
  /**
   * Card field in *ContentCards → NewsCards → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: content_cards.default.primary.card[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  card: prismic.GroupField<Simplify<ContentCardsSliceDefaultPrimaryCardItem>>;
}

/**
 * NewsCards variation for ContentCards Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ContentCardsSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<ContentCardsSliceDefaultPrimary>,
  never
>;

/**
 * Primary content in *ContentCards → GuestCards → Primary*
 */
export interface ContentCardsSliceGuestCardsPrimary {
  /**
   * Card field in *ContentCards → GuestCards → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: content_cards.guestCards.primary.card[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  card: prismic.GroupField<
    Simplify<ContentCardsSliceGuestCardsPrimaryCardItem>
  >;
}

/**
 * GuestCards variation for ContentCards Slice
 *
 * - **API ID**: `guestCards`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ContentCardsSliceGuestCards = prismic.SharedSliceVariation<
  "guestCards",
  Simplify<ContentCardsSliceGuestCardsPrimary>,
  never
>;

/**
 * Primary content in *ContentCards → RoleCards → Primary*
 */
export interface ContentCardsSliceRoleCardsPrimary {
  /**
   * Card field in *ContentCards → RoleCards → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: content_cards.roleCards.primary.card[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  card: prismic.GroupField<Simplify<ContentCardsSliceRoleCardsPrimaryCardItem>>;
}

/**
 * RoleCards variation for ContentCards Slice
 *
 * - **API ID**: `roleCards`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ContentCardsSliceRoleCards = prismic.SharedSliceVariation<
  "roleCards",
  Simplify<ContentCardsSliceRoleCardsPrimary>,
  never
>;

/**
 * Slice variation for *ContentCards*
 */
type ContentCardsSliceVariation =
  | ContentCardsSliceDefault
  | ContentCardsSliceGuestCards
  | ContentCardsSliceRoleCards;

/**
 * ContentCards Shared Slice
 *
 * - **API ID**: `content_cards`
 * - **Description**: ContentCards
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ContentCardsSlice = prismic.SharedSlice<
  "content_cards",
  ContentCardsSliceVariation
>;

/**
 * Item in *InfoCards → InfoCards → Primary → Card*
 */
export interface ContentcardSliceDefaultPrimaryCardItem {
  /**
   * Icon field in *InfoCards → InfoCards → Primary → Card*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Icon
   * - **API ID Path**: contentcard.default.primary.card[].icon
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  icon: prismic.KeyTextField;

  /**
   * Titel field in *InfoCards → InfoCards → Primary → Card*
   *
   * - **Field Type**: Title
   * - **Placeholder**: Titel
   * - **API ID Path**: contentcard.default.primary.card[].title
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  title: prismic.TitleField;

  /**
   * Inhoud field in *InfoCards → InfoCards → Primary → Card*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Inhoud
   * - **API ID Path**: contentcard.default.primary.card[].body
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  body: prismic.KeyTextField;

  /**
   * Hyperlink field in *InfoCards → InfoCards → Primary → Card*
   *
   * - **Field Type**: Link
   * - **Placeholder**: Hyperlink
   * - **API ID Path**: contentcard.default.primary.card[].link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  link: prismic.LinkField;
}

/**
 * Item in *InfoCards → InfoCardsExpandable → Primary → Card*
 */
export interface ContentcardSliceInfoCardsExpandablePrimaryCardItem {
  /**
   * Titel field in *InfoCards → InfoCardsExpandable → Primary → Card*
   *
   * - **Field Type**: Title
   * - **Placeholder**: Titel
   * - **API ID Path**: contentcard.infoCardsExpandable.primary.card[].title
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  title: prismic.TitleField;

  /**
   * Inhoud field in *InfoCards → InfoCardsExpandable → Primary → Card*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Inhoud
   * - **API ID Path**: contentcard.infoCardsExpandable.primary.card[].body
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  body: prismic.KeyTextField;

  /**
   * Inhoud (uitgeklapt) field in *InfoCards → InfoCardsExpandable → Primary → Card*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Inhoud (uitgeklapt)
   * - **API ID Path**: contentcard.infoCardsExpandable.primary.card[].body_expanded
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  body_expanded: prismic.RichTextField;
}

/**
 * Primary content in *InfoCards → InfoCards → Primary*
 */
export interface ContentcardSliceDefaultPrimary {
  /**
   * Card field in *InfoCards → InfoCards → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: contentcard.default.primary.card[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  card: prismic.GroupField<Simplify<ContentcardSliceDefaultPrimaryCardItem>>;
}

/**
 * InfoCards variation for InfoCards Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ContentcardSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<ContentcardSliceDefaultPrimary>,
  never
>;

/**
 * Primary content in *InfoCards → InfoCardsExpandable → Primary*
 */
export interface ContentcardSliceInfoCardsExpandablePrimary {
  /**
   * Card field in *InfoCards → InfoCardsExpandable → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: contentcard.infoCardsExpandable.primary.card[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  card: prismic.GroupField<
    Simplify<ContentcardSliceInfoCardsExpandablePrimaryCardItem>
  >;

  /**
   * Achtergrond kleur field in *InfoCards → InfoCardsExpandable → Primary*
   *
   * - **Field Type**: Select
   * - **Placeholder**: Kies een achtergrond kleur (niet voor de kaartjes, maar erachter)
   * - **Default Value**: Wit
   * - **API ID Path**: contentcard.infoCardsExpandable.primary.background_color
   * - **Documentation**: https://prismic.io/docs/field#select
   */
  background_color: prismic.SelectField<"Wit" | "Lichtblauw", "filled">;
}

/**
 * InfoCardsExpandable variation for InfoCards Slice
 *
 * - **API ID**: `infoCardsExpandable`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ContentcardSliceInfoCardsExpandable = prismic.SharedSliceVariation<
  "infoCardsExpandable",
  Simplify<ContentcardSliceInfoCardsExpandablePrimary>,
  never
>;

/**
 * Slice variation for *InfoCards*
 */
type ContentcardSliceVariation =
  | ContentcardSliceDefault
  | ContentcardSliceInfoCardsExpandable;

/**
 * InfoCards Shared Slice
 *
 * - **API ID**: `contentcard`
 * - **Description**: Contentcard
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ContentcardSlice = prismic.SharedSlice<
  "contentcard",
  ContentcardSliceVariation
>;

/**
 * Item in *Faq → Default → Primary → Set*
 */
export interface FaqSliceDefaultPrimarySetItem {
  /**
   * Vraag field in *Faq → Default → Primary → Set*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Vraag
   * - **API ID Path**: faq.default.primary.set[].question
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  question: prismic.KeyTextField;

  /**
   * Antwoord field in *Faq → Default → Primary → Set*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Antwoord
   * - **API ID Path**: faq.default.primary.set[].answer
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  answer: prismic.KeyTextField;
}

/**
 * Primary content in *Faq → Default → Primary*
 */
export interface FaqSliceDefaultPrimary {
  /**
   * Set field in *Faq → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: faq.default.primary.set[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  set: prismic.GroupField<Simplify<FaqSliceDefaultPrimarySetItem>>;
}

/**
 * Default variation for Faq Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type FaqSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<FaqSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *Faq*
 */
type FaqSliceVariation = FaqSliceDefault;

/**
 * Faq Shared Slice
 *
 * - **API ID**: `faq`
 * - **Description**: Faq
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type FaqSlice = prismic.SharedSlice<"faq", FaqSliceVariation>;

/**
 * Primary content in *IFrame → Default → Primary*
 */
export interface IFrameSliceDefaultPrimary {
  /**
   * URL field in *IFrame → Default → Primary*
   *
   * - **Field Type**: Link
   * - **Placeholder**: URL (extern)
   * - **API ID Path**: i_frame.default.primary.url
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  url: prismic.LinkField;
}

/**
 * Default variation for IFrame Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type IFrameSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<IFrameSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *IFrame*
 */
type IFrameSliceVariation = IFrameSliceDefault;

/**
 * IFrame Shared Slice
 *
 * - **API ID**: `i_frame`
 * - **Description**: IFrame
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type IFrameSlice = prismic.SharedSlice<"i_frame", IFrameSliceVariation>;

/**
 * Default variation for LatestNews Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type LatestNewsSliceDefault = prismic.SharedSliceVariation<
  "default",
  Record<string, never>,
  never
>;

/**
 * Slice variation for *LatestNews*
 */
type LatestNewsSliceVariation = LatestNewsSliceDefault;

/**
 * LatestNews Shared Slice
 *
 * - **API ID**: `latest_news`
 * - **Description**: LatestNews
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type LatestNewsSlice = prismic.SharedSlice<
  "latest_news",
  LatestNewsSliceVariation
>;

/**
 * Primary content in *Section → Default → Primary*
 */
export interface SectionSliceDefaultPrimary {
  /**
   * Foto field in *Section → Default → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: section.default.primary.image
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image: prismic.ImageField<never>;

  /**
   * Inhoud field in *Section → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Inhoud
   * - **API ID Path**: section.default.primary.body
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  body: prismic.RichTextField;

  /**
   * Achtergrond kleur field in *Section → Default → Primary*
   *
   * - **Field Type**: Select
   * - **Placeholder**: Kies een achtergrond kleur
   * - **Default Value**: Wit
   * - **API ID Path**: section.default.primary.background_color
   * - **Documentation**: https://prismic.io/docs/field#select
   */
  background_color: prismic.SelectField<"Wit" | "Lichtblauw", "filled">;
}

/**
 * Default variation for Section Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type SectionSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<SectionSliceDefaultPrimary>,
  never
>;

/**
 * Primary content in *Section → Vertical → Primary*
 */
export interface SectionSliceVerticalPrimary {
  /**
   * Foto field in *Section → Vertical → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: section.vertical.primary.image
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image: prismic.ImageField<never>;

  /**
   * Inhoud field in *Section → Vertical → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Inhoud
   * - **API ID Path**: section.vertical.primary.body
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  body: prismic.RichTextField;
}

/**
 * Vertical variation for Section Slice
 *
 * - **API ID**: `vertical`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type SectionSliceVertical = prismic.SharedSliceVariation<
  "vertical",
  Simplify<SectionSliceVerticalPrimary>,
  never
>;

/**
 * Primary content in *Section → Mirrored → Primary*
 */
export interface SectionSliceMirroredPrimary {
  /**
   * Foto field in *Section → Mirrored → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: section.mirrored.primary.image
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image: prismic.ImageField<never>;

  /**
   * Inhoud field in *Section → Mirrored → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Inhoud
   * - **API ID Path**: section.mirrored.primary.body
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  body: prismic.RichTextField;

  /**
   * Achtergrond kleur field in *Section → Mirrored → Primary*
   *
   * - **Field Type**: Select
   * - **Placeholder**: Kies een achtergrond kleur
   * - **Default Value**: Wit
   * - **API ID Path**: section.mirrored.primary.background_color
   * - **Documentation**: https://prismic.io/docs/field#select
   */
  background_color: prismic.SelectField<"Wit" | "Lichtblauw", "filled">;
}

/**
 * Mirrored variation for Section Slice
 *
 * - **API ID**: `mirrored`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type SectionSliceMirrored = prismic.SharedSliceVariation<
  "mirrored",
  Simplify<SectionSliceMirroredPrimary>,
  never
>;

/**
 * Primary content in *Section → Stacked → Primary*
 */
export interface SectionSliceStackedPrimary {
  /**
   * Foto field in *Section → Stacked → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: section.stacked.primary.image
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image: prismic.ImageField<never>;

  /**
   * Inhoud field in *Section → Stacked → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Inhoud
   * - **API ID Path**: section.stacked.primary.body
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  body: prismic.RichTextField;
}

/**
 * Stacked variation for Section Slice
 *
 * - **API ID**: `stacked`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type SectionSliceStacked = prismic.SharedSliceVariation<
  "stacked",
  Simplify<SectionSliceStackedPrimary>,
  never
>;

/**
 * Primary content in *Section → NoImage → Primary*
 */
export interface SectionSliceNoImagePrimary {
  /**
   * Inhoud field in *Section → NoImage → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Inhoud
   * - **API ID Path**: section.noImage.primary.body
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  body: prismic.RichTextField;
}

/**
 * NoImage variation for Section Slice
 *
 * - **API ID**: `noImage`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type SectionSliceNoImage = prismic.SharedSliceVariation<
  "noImage",
  Simplify<SectionSliceNoImagePrimary>,
  never
>;

/**
 * Slice variation for *Section*
 */
type SectionSliceVariation =
  | SectionSliceDefault
  | SectionSliceVertical
  | SectionSliceMirrored
  | SectionSliceStacked
  | SectionSliceNoImage;

/**
 * Section Shared Slice
 *
 * - **API ID**: `section`
 * - **Description**: Section
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type SectionSlice = prismic.SharedSlice<
  "section",
  SectionSliceVariation
>;

declare module "@prismicio/client" {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig,
    ): prismic.Client<AllDocumentTypes>;
  }

  interface CreateWriteClient {
    (
      repositoryNameOrEndpoint: string,
      options: prismic.WriteClientConfig,
    ): prismic.WriteClient<AllDocumentTypes>;
  }

  interface CreateMigration {
    (): prismic.Migration<AllDocumentTypes>;
  }

  namespace Content {
    export type {
      PageDocument,
      PageDocumentData,
      PageDocumentDataSlicesSlice,
      PostDocument,
      PostDocumentData,
      PostDocumentDataSlicesSlice,
      RouteDocument,
      RouteDocumentData,
      RouteDocumentDataSlicesSlice,
      SocialDocument,
      SocialDocumentData,
      SocialDocumentDataSocialItemItem,
      AllDocumentTypes,
      ArchiveSlice,
      ArchiveSliceVariation,
      ArchiveSliceDefault,
      ArchiveSliceAutomatic,
      ContactFormSlice,
      ContactFormSliceDefaultPrimary,
      ContactFormSliceVariation,
      ContactFormSliceDefault,
      ContentCardsSlice,
      ContentCardsSliceDefaultPrimaryCardItem,
      ContentCardsSliceDefaultPrimary,
      ContentCardsSliceGuestCardsPrimaryCardItem,
      ContentCardsSliceGuestCardsPrimary,
      ContentCardsSliceRoleCardsPrimaryCardItem,
      ContentCardsSliceRoleCardsPrimary,
      ContentCardsSliceVariation,
      ContentCardsSliceDefault,
      ContentCardsSliceGuestCards,
      ContentCardsSliceRoleCards,
      ContentcardSlice,
      ContentcardSliceDefaultPrimaryCardItem,
      ContentcardSliceDefaultPrimary,
      ContentcardSliceInfoCardsExpandablePrimaryCardItem,
      ContentcardSliceInfoCardsExpandablePrimary,
      ContentcardSliceVariation,
      ContentcardSliceDefault,
      ContentcardSliceInfoCardsExpandable,
      FaqSlice,
      FaqSliceDefaultPrimarySetItem,
      FaqSliceDefaultPrimary,
      FaqSliceVariation,
      FaqSliceDefault,
      IFrameSlice,
      IFrameSliceDefaultPrimary,
      IFrameSliceVariation,
      IFrameSliceDefault,
      LatestNewsSlice,
      LatestNewsSliceVariation,
      LatestNewsSliceDefault,
      SectionSlice,
      SectionSliceDefaultPrimary,
      SectionSliceVerticalPrimary,
      SectionSliceMirroredPrimary,
      SectionSliceStackedPrimary,
      SectionSliceNoImagePrimary,
      SectionSliceVariation,
      SectionSliceDefault,
      SectionSliceVertical,
      SectionSliceMirrored,
      SectionSliceStacked,
      SectionSliceNoImage,
    };
  }
}

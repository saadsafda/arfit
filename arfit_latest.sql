--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-03-14 02:01:15

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5264 (class 0 OID 16446)
-- Dependencies: 225
-- Data for Name: inventory_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventory_category (id, name, description, type, created_at, modified_at) FROM stdin;
8c8d034c-cf5e-45a4-9cef-ca95c0274f27	Shirts	\N	apparel	2024-06-08 23:55:17	2024-06-08 23:55:17
b98fd639-c6a7-46ee-971a-c7f484dcfde2	Pants	\N	apparel	2024-06-08 23:55:17	2024-06-08 23:55:17
1a34676c-f0f9-4349-911b-56d700220298	Shoes	\N	apparel	2024-06-08 23:55:17	2024-06-08 23:55:17
5b6c0533-d6bf-4437-8ea5-86814c7fbe37	Hats	\N	apparel	2024-06-08 23:55:17	2024-06-08 23:55:17
b8586e1b-09f6-490d-bf6a-3f18df089af7	Jackets	\N	apparel	2024-06-08 23:55:17	2024-06-08 23:55:17
df8b25af-0705-4288-b331-389d2db86096	Shorts	\N	apparel	2024-06-08 23:55:17	2024-06-08 23:55:17
ae53764d-58e1-42d5-958e-b616e9663473	T-Shirts	\N	apparel	2024-06-08 23:55:17	2024-06-08 23:55:17
e2b51511-e5ed-4936-96ff-6ce7987c147f	Dress Shirts	\N	apparel	2024-06-08 23:55:17	2024-06-08 23:55:17
d9feba45-a55e-476c-9e10-37fb140e6aaa	Under Shirts	\N	apparel	2024-06-08 23:55:17	2024-06-08 23:55:17
de724059-2c5d-444d-b43d-7f8672c077d2	Hoodies	\N	apparel	2024-06-08 23:55:17	2024-06-08 23:55:17
0da32a59-83aa-4b03-ad59-c0c38573f098	Casual Shirts	\N	apparel	2024-06-08 23:55:17	2024-06-08 23:55:17
6d475a28-4767-4a2c-a4b2-0ac36d61b737	Round-neck Shirts	\N	apparel	2024-06-08 23:55:17	2024-06-08 23:55:17
193aa98f-320c-4a7a-9923-a20b0e7ba8fe	Zipper Hoodies	\N	apparel	2024-06-08 23:55:17	2024-06-08 23:55:17
925ea5bc-04d1-47fb-b238-1b7a37ed0450	Warsaw Jackets	\N	apparel	2024-06-08 23:55:17	2024-06-08 23:55:17
\.


--
-- TOC entry 5271 (class 0 OID 16495)
-- Dependencies: 232
-- Data for Name: inventory_demo_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventory_demo_category (category_id, is_demo_item, created_at, modified_at) FROM stdin;
8c8d034c-cf5e-45a4-9cef-ca95c0274f27	t	2024-06-08 23:55:17	2024-06-08 23:55:17
b98fd639-c6a7-46ee-971a-c7f484dcfde2	t	2024-06-08 23:55:17	2024-06-08 23:55:17
1a34676c-f0f9-4349-911b-56d700220298	t	2024-06-08 23:55:17	2024-06-08 23:55:17
5b6c0533-d6bf-4437-8ea5-86814c7fbe37	t	2024-06-08 23:55:17	2024-06-08 23:55:17
b8586e1b-09f6-490d-bf6a-3f18df089af7	t	2024-06-08 23:55:17	2024-06-08 23:55:17
df8b25af-0705-4288-b331-389d2db86096	t	2024-06-08 23:55:17	2024-06-08 23:55:17
ae53764d-58e1-42d5-958e-b616e9663473	t	2024-06-08 23:55:17	2024-06-08 23:55:17
e2b51511-e5ed-4936-96ff-6ce7987c147f	t	2024-06-08 23:55:17	2024-06-08 23:55:17
d9feba45-a55e-476c-9e10-37fb140e6aaa	t	2024-06-08 23:55:17	2024-06-08 23:55:17
de724059-2c5d-444d-b43d-7f8672c077d2	t	2024-06-08 23:55:17	2024-06-08 23:55:17
0da32a59-83aa-4b03-ad59-c0c38573f098	t	2024-06-08 23:55:17	2024-06-08 23:55:17
6d475a28-4767-4a2c-a4b2-0ac36d61b737	t	2024-06-08 23:55:17	2024-06-08 23:55:17
193aa98f-320c-4a7a-9923-a20b0e7ba8fe	t	2024-06-08 23:55:17	2024-06-08 23:55:17
925ea5bc-04d1-47fb-b238-1b7a37ed0450	t	2024-06-08 23:55:17	2024-06-08 23:55:17
\.


--
-- TOC entry 5270 (class 0 OID 16488)
-- Dependencies: 231
-- Data for Name: inventory_demo_item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventory_demo_item (item_id, is_demo_item, created_at, modified_at) FROM stdin;
555e3f63-f927-4b76-93cd-098ee5fbde4e	t	2024-06-08 23:55:17	2024-06-08 23:55:17
2f97defc-964c-45b8-b8e4-5ce85892cd90	t	2024-06-08 23:55:17	2024-06-08 23:55:17
e68e6704-906b-4ac6-8349-be4032fe899e	t	2024-06-08 23:55:17	2024-06-08 23:55:17
3d056ef8-11fb-40f0-8eeb-ff8e0d685a4b	t	2024-06-08 23:55:17	2024-06-08 23:55:17
f0dfaca7-7929-4b9e-b531-e644bcecc49d	t	2024-06-08 23:55:17	2024-06-08 23:55:17
df94e0a0-fe85-42eb-9753-60e1b96fdafa	t	2024-06-08 23:55:17	2024-06-08 23:55:17
25d01f8e-b0d9-4121-8f50-fdc59fbb5637	t	2024-06-08 23:55:17	2024-06-08 23:55:17
f8a1a80d-69be-4b89-82c2-46fb48449089	t	2024-06-08 23:55:17	2024-06-08 23:55:17
4187174c-7294-4de9-ae18-e28bb00582b5	t	2024-06-08 23:55:17	2024-06-08 23:55:17
cfff7483-079c-46fa-a804-a459f03f81ae	t	2024-06-08 23:55:17	2024-06-08 23:55:17
9fca9bf9-71d0-41cb-a354-730c3306587b	t	2024-06-08 23:55:17	2024-06-08 23:55:17
fbf50560-2155-40f3-8a1f-fbf794668384	t	2024-06-08 23:55:17	2024-06-08 23:55:17
00380cd6-754c-4cc5-9d04-1a08d74eff6a	t	2024-06-08 23:55:17	2024-06-08 23:55:17
a30daf52-e380-4796-872c-c7ebd2b4de04	t	2024-06-08 23:55:17	2024-06-08 23:55:17
\.


--
-- TOC entry 5265 (class 0 OID 16453)
-- Dependencies: 226
-- Data for Name: inventory_item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventory_item (id, category_id, name, brand, price, currency, description, created_at, modified_at, lens_id) FROM stdin;
c8478e9f-92a2-4606-af6f-4d29b644cfa8	8c8d034c-cf5e-45a4-9cef-ca95c0274f27	Threaded Dreams Tee	BrandAlpha	33.65	gbp	High quality t-shirt.	\N	\N	4b2ad39f-b45f-48ce-8938-9284db52cbe0
f55bdb3e-6394-4b2d-90e8-649e0c228cc8	8c8d034c-cf5e-45a4-9cef-ca95c0274f27	Urban Ink T-Shirt	BrandBeta	40.85	gbp	Unique urban design.	\N	\N	3be0d265-371f-4308-acf5-38a2b9eba99e
8468f20f-78ec-4193-bfa7-2fcebbaa5fb5	8c8d034c-cf5e-45a4-9cef-ca95c0274f27	Bold Horizon Tee	BrandGamma	11.63	gbp	Modern and stylish.	\N	\N	87ad3b3d-a90f-45b7-bcb7-39f4eb1504f9
1debe925-f928-43a3-a291-736a89d635b7	8c8d034c-cf5e-45a4-9cef-ca95c0274f27	Electric Edge T-Shirt	BrandDelta	43.98	gbp	Cutting edge design.	\N	\N	0f1e15c0-0fb3-4db1-88a3-9cab95dd02b7
105cc308-5136-4e8f-8c6a-570e052f8ebe	8c8d034c-cf5e-45a4-9cef-ca95c0274f27	Cosmic Vibe Tee	BrandEpsilon	17.41	gbp	Cosmic vibes all around.	\N	\N	fa3d8392-7aca-4ac6-a4e4-a64cac9c6975
16b20798-4efa-4b7d-96a4-f04fc60bddd0	8c8d034c-cf5e-45a4-9cef-ca95c0274f27	Vintage Pulse T-Shirt	BrandZeta	41.48	gbp	Vintage style with a modern twist.	\N	\N	329f9b75-de2a-4bf4-846c-8cf953f7b1ee
6ef44038-439f-46e5-8b10-9ea73eb48303	8c8d034c-cf5e-45a4-9cef-ca95c0274f27	Modern Muse Tee	BrandEta	48.12	gbp	Inspired by modern art.	\N	\N	2256b54a-0541-4e53-b0d9-6f41da141ca4
2e674460-5526-4507-acc0-16b83e24ec47	8c8d034c-cf5e-45a4-9cef-ca95c0274f27	Neon Dream T-Shirt	BrandTheta	45.49	gbp	Neon and vibrant design.	\N	\N	10d018bc-b081-4ac1-a369-3d0770e1b76a
092a346b-d3d1-4020-974b-c91bd19d685d	8c8d034c-cf5e-45a4-9cef-ca95c0274f27	Retro Rebel Tee	BrandIota	29.08	gbp	Retro style for rebels.	\N	\N	f2ce4f49-d8e9-4257-83f8-514538a798a8
fee1c594-85f5-4781-a59d-6b4d5cb53f92	8c8d034c-cf5e-45a4-9cef-ca95c0274f27	Infinite Style T-Shirt	BrandKappa	43.44	gbp	Infinite possibilities in style.	\N	\N	67b402f7-98cd-455d-8d63-5c687e3cf772
8877fa47-b004-4f58-aa76-20dfcd5b25b5	8c8d034c-cf5e-45a4-9cef-ca95c0274f27	Dynamic Daze Tee	BrandLambda	43.11	gbp	Dynamic and energetic.	\N	\N	e6d58563-01dc-415a-b644-c28d84416ee6
f4af27a5-e620-41dc-a4b9-5448ce541236	8c8d034c-cf5e-45a4-9cef-ca95c0274f27	Elemental Vibe T-Shirt	BrandMu	15.65	gbp	Elemental design with vibrant vibes.	\N	\N	cbbe1d02-21cf-40ba-b8e6-8d36e85e9939
612407d1-5650-494b-8518-eb9a8a084422	8c8d034c-cf5e-45a4-9cef-ca95c0274f27	Primal Print Tee	BrandNu	43.44	gbp	Primal print for bold souls.	\N	\N	d32902d7-05d9-48c9-bf24-e5d5c1671895
21f78d0a-0f63-4523-8f4e-158e0a9b93fe	8c8d034c-cf5e-45a4-9cef-ca95c0274f27	Chic Canvas T-Shirt	BrandXi	31.73	gbp	Chic and elegant canvas design.	\N	\N	eb00ec2e-e5f7-4c78-ba1e-46062ef8c624
76d129dc-8bd9-4875-879d-6e960ea3ee02	8c8d034c-cf5e-45a4-9cef-ca95c0274f27	Urban Zen Tee	BrandOmicron	49.02	gbp	Urban style meets zen simplicity.	\N	\N	9729768b-7990-4fa5-bab4-b681be9d0657
\.


--
-- TOC entry 5266 (class 0 OID 16460)
-- Dependencies: 227
-- Data for Name: inventory_item_color; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventory_item_color (id, item_id, color, color_hex, created_at, modified_at) FROM stdin;
d1b7bbd4-86b7-4a16-9e20-1a68e5e6b7a2	c8478e9f-92a2-4606-af6f-4d29b644cfa8	Green	#008000	\N	\N
e3b2a8f1-5c7d-4e2f-90ab-3e8d7c6f5a4b	f55bdb3e-6394-4b2d-90e8-649e0c228cc8	Pink	#FFC0CB	\N	\N
f5c4d3e2-6b8a-4d1f-81ac-2b7d9f6e5c3a	8468f20f-78ec-4193-bfa7-2fcebbaa5fb5	Blue	#0000FF	\N	\N
a6d5e4f3-7b9c-4a1d-82de-3c4b5a6f7d8e	1debe925-f928-43a3-a291-736a89d635b7	Purple	#800080	\N	\N
b7e6f5d4-8c9b-4e2d-93fa-4d5c6b7e8f9a	105cc308-5136-4e8f-8c6a-570e052f8ebe	Brown	#A52A2A	\N	\N
c8f7d6e5-9d0a-4f3b-94ab-5e6f7d8c9b0a	16b20798-4efa-4b7d-96a4-f04fc60bddd0	Brown	#A52A2A	\N	\N
d9a8b7c6-0e1f-4d2a-85bc-6f7e8d9a0b1c	6ef44038-439f-46e5-8b10-9ea73eb48303	Purple	#800080	\N	\N
e0b9c8d7-1f2e-4c3a-96ad-7e8f9a0b1c2d	2e674460-5526-4507-acc0-16b83e24ec47	Yellow	#FFFF00	\N	\N
f1c0d9e8-2a3b-4e1d-87cb-8d9e0f1a2b3c	092a346b-d3d1-4020-974b-c91bd19d685d	Pink	#FFC0CB	\N	\N
a2d1c0e9-3b4c-4f2a-98dc-9e0f1a2b3c4d	fee1c594-85f5-4781-a59d-6b4d5cb53f92	White	#FFFFFF	\N	\N
b3e2d1f0-4c5d-4a3b-89ed-0f1a2b3c4d5e	8877fa47-b004-4f58-aa76-20dfcd5b25b5	Red	#FF0000	\N	\N
c4f3e2d1-5d6e-4b2a-7fce-1a2b3c4d5e6f	f4af27a5-e620-41dc-a4b9-5448ce541236	Pink	#FFC0CB	\N	\N
d5a4f3e2-6e7d-4c1b-80df-2b3c4d5e6f7a	612407d1-5650-494b-8518-eb9a8a084422	White	#FFFFFF	\N	\N
e6b5a4f3-7f8e-4d2c-91e0-3c4d5e6f7a8b	21f78d0a-0f63-4523-8f4e-158e0a9b93fe	Brown	#A52A2A	\N	\N
f7c6b5a4-8f9e-4e3d-82f1-4d5e6f7a8b9c	76d129dc-8bd9-4875-879d-6e960ea3ee02	White	#FFFFFF	\N	\N
\.


--
-- TOC entry 5269 (class 0 OID 16481)
-- Dependencies: 230
-- Data for Name: inventory_item_image; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventory_item_image (id, item_id, image, created_at, modified_at) FROM stdin;
\.


--
-- TOC entry 5268 (class 0 OID 16474)
-- Dependencies: 229
-- Data for Name: inventory_item_image_url; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventory_item_image_url (id, item_id, image_url, created_at, modified_at) FROM stdin;
e5f69b5c-61c3-4a1f-9f41-30a619d47e01	c8478e9f-92a2-4606-af6f-4d29b644cfa8	1.jpg	\N	\N
b7c2a3d4-84e7-45a8-9e53-91f3a0a847f2	f55bdb3e-6394-4b2d-90e8-649e0c228cc8	2.jpg	\N	\N
f45e6a8d-0c1e-4a2d-8e5d-1f2a6c3b4e5f	8468f20f-78ec-4193-bfa7-2fcebbaa5fb5	3.jpg	\N	\N
a1b2c3d4-e5f6-4a7b-8c9d-000000000004	1debe925-f928-43a3-a291-736a89d635b7	4.jpg	\N	\N
d3f4e5c6-7890-4a12-8b34-56789abcdef5	105cc308-5136-4e8f-8c6a-570e052f8ebe	5.jpg	\N	\N
e5f6a7b8-c9d0-4a1b-8c2d-1234567890ab	16b20798-4efa-4b7d-96a4-f04fc60bddd0	6.jpg	\N	\N
a7b8c9d0-e1f2-4a3b-8c4d-234567890abc	6ef44038-439f-46e5-8b10-9ea73eb48303	7.jpg	\N	\N
b8c9d0e1-f2a3-4a5b-8c6d-34567890abcd	2e674460-5526-4507-acc0-16b83e24ec47	8.jpg	\N	\N
c9d0e1f2-a3b4-4a6b-8c7d-4567890abcde	092a346b-d3d1-4020-974b-c91bd19d685d	9.jpg	\N	\N
d0e1f2a3-b4c5-4a7b-8c8d-567890abcdef	fee1c594-85f5-4781-a59d-6b4d5cb53f92	10.jpg	\N	\N
e1f2a3b4-c5d6-4a8b-8c9d-67890abcdef1	8877fa47-b004-4f58-aa76-20dfcd5b25b5	11.jpg	\N	\N
f2a3b4c5-d6e7-4a9b-8cad-7890abcdef12	f4af27a5-e620-41dc-a4b9-5448ce541236	12.jpg	\N	\N
a3b4c5d6-e7f8-4a0b-8cbd-890abcdef123	612407d1-5650-494b-8518-eb9a8a084422	13.jpg	\N	\N
b4c5d6e7-f8a9-4a1b-8cce-90abcdef1234	21f78d0a-0f63-4523-8f4e-158e0a9b93fe	14.jpg	\N	\N
c5d6e7f8-a9b0-4a2b-8cdf-0abcdef12345	76d129dc-8bd9-4875-879d-6e960ea3ee02	15.jpg	\N	\N
\.


--
-- TOC entry 5267 (class 0 OID 16467)
-- Dependencies: 228
-- Data for Name: inventory_item_size; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventory_item_size (id, item_id, size, created_at, modified_at) FROM stdin;
d1b7bbd4-86b7-4a16-9e20-1a68e5e6b7a2	c8478e9f-92a2-4606-af6f-4d29b644cfa8	XL	\N	\N
e3b2a8f1-5c7d-4e2f-90ab-3e8d7c6f5a4b	c8478e9f-92a2-4606-af6f-4d29b644cfa8	S	\N	\N
f5c4d3e2-6b8a-4d1f-81ac-2b7d9f6e5c3a	c8478e9f-92a2-4606-af6f-4d29b644cfa8	XXL	\N	\N
a6d5e4f3-7b9c-4a1d-82de-3c4b5a6f7d8e	c8478e9f-92a2-4606-af6f-4d29b644cfa8	M	\N	\N
b7e6f5d4-8c9b-4e2d-93fa-4d5c6b7e8f9a	f55bdb3e-6394-4b2d-90e8-649e0c228cc8	L	\N	\N
c8f7d6e5-9d0a-4f3b-94ab-5e6f7d8c9b0a	8468f20f-78ec-4193-bfa7-2fcebbaa5fb5	XXL	\N	\N
d9a8b7c6-0e1f-4d2a-85bc-6f7e8d9a0b1c	8468f20f-78ec-4193-bfa7-2fcebbaa5fb5	L	\N	\N
e0b9c8d7-1f2e-4c3a-96ad-7e8f9a0b1c2d	8468f20f-78ec-4193-bfa7-2fcebbaa5fb5	S	\N	\N
f1c0d9e8-2a3b-4e1d-87cb-8d9e0f1a2b3c	1debe925-f928-43a3-a291-736a89d635b7	M	\N	\N
a2d1c0e9-3b4c-4f2a-98dc-9e0f1a2b3c4d	1debe925-f928-43a3-a291-736a89d635b7	XXL	\N	\N
b3e2d1f0-4c5d-4a3b-89ed-0f1a2b3c4d5e	105cc308-5136-4e8f-8c6a-570e052f8ebe	L	\N	\N
c4f3e2d1-5d6e-4b2a-7fce-1a2b3c4d5e6f	105cc308-5136-4e8f-8c6a-570e052f8ebe	XXL	\N	\N
d5a4f3e2-6e7d-4c1b-80df-2b3c4d5e6f7a	105cc308-5136-4e8f-8c6a-570e052f8ebe	M	\N	\N
e6b5a4f3-7f8e-4d2c-91e0-3c4d5e6f7a8b	105cc308-5136-4e8f-8c6a-570e052f8ebe	S	\N	\N
f7c6b5a4-8f9e-4e3d-82f1-4d5e6f7a8b9c	16b20798-4efa-4b7d-96a4-f04fc60bddd0	XXL	\N	\N
a8d7c6b5-9f0e-4d3c-83f2-5e6f7a8b9c0d	16b20798-4efa-4b7d-96a4-f04fc60bddd0	L	\N	\N
b9c7d8e9-0f1e-4c3b-84f3-6a7b8c9d0e1f	16b20798-4efa-4b7d-96a4-f04fc60bddd0	S	\N	\N
c0d1e2f3-1a2b-4c3d-85e4-7a8b9c0d1e2f	16b20798-4efa-4b7d-96a4-f04fc60bddd0	XL	\N	\N
d1e2f3a4-2b3c-4d5e-86f5-8a9b0c1d2e3f	16b20798-4efa-4b7d-96a4-f04fc60bddd0	M	\N	\N
e2f3a4b5-3c4d-4e5f-87a6-9a0b1c2d3e4f	6ef44038-439f-46e5-8b10-9ea73eb48303	S	\N	\N
f3a4b5c6-4d5e-4f6a-88b7-0a1b2c3d4e5f	6ef44038-439f-46e5-8b10-9ea73eb48303	XXL	\N	\N
a4b5c6d7-5e6f-4a7b-89c8-1b2c3d4e5f60	6ef44038-439f-46e5-8b10-9ea73eb48303	M	\N	\N
b5c6d7e8-6f70-4b8c-9ad9-2c3d4e5f6071	6ef44038-439f-46e5-8b10-9ea73eb48303	XL	\N	\N
c6d7e8f9-7a81-4c9d-9bda-3d4e5f607182	6ef44038-439f-46e5-8b10-9ea73eb48303	L	\N	\N
d7e8f9a0-8b92-4cad-8cdb-4e5f60718293	2e674460-5526-4507-acc0-16b83e24ec47	XL	\N	\N
e8f9a0b1-9ca3-4dbe-8ced-5f60718293a4	2e674460-5526-4507-acc0-16b83e24ec47	XXL	\N	\N
f9a0b1c2-ada4-4ecf-8def-60718293a4b5	2e674460-5526-4507-acc0-16b83e24ec47	L	\N	\N
a0b1c2d3-bea5-4fd0-8ef0-718293a4b5c6	092a346b-d3d1-4020-974b-c91bd19d685d	L	\N	\N
b1c2d3e4-cfb6-4e07-8f01-8293a4b5c6d7	092a346b-d3d1-4020-974b-c91bd19d685d	XXL	\N	\N
c2d3e4f5-d0c7-4f18-8e29-93a4b5c6d7e8	092a346b-d3d1-4020-974b-c91bd19d685d	S	\N	\N
d3e4f5a6-e1d8-4f29-8f3a-a4b5c6d7e8f9	092a346b-d3d1-4020-974b-c91bd19d685d	XL	\N	\N
e4f5a6b7-f2e9-4f3a-8f4b-b5c6d7e8f9a0	fee1c594-85f5-4781-a59d-6b4d5cb53f92	S	\N	\N
f5a6b7c8-a3f0-4f4b-8f5c-c6d7e8f9a0b1	fee1c594-85f5-4781-a59d-6b4d5cb53f92	XXL	\N	\N
a6b7c8d9-b4f1-4f5c-8f6d-d7e8f9a0b1c2	8877fa47-b004-4f58-aa76-20dfcd5b25b5	XL	\N	\N
b7c8d9e0-c5f2-4f6d-8f7e-e8f9a0b1c2d3	8877fa47-b004-4f58-aa76-20dfcd5b25b5	XXL	\N	\N
c8d9e0f1-d6f3-4f7e-8f8f-f9a0b1c2d3e4	f4af27a5-e620-41dc-a4b9-5448ce541236	M	\N	\N
d9e0f1a2-e7f4-4f8a-8090-a0b1c2d3e4f5	f4af27a5-e620-41dc-a4b9-5448ce541236	S	\N	\N
ea0f1a2b-f8f5-4f9a-8191-b1c2d3e4f5a6	f4af27a5-e620-41dc-a4b9-5448ce541236	XL	\N	\N
fb0f1a2c-0a06-4fab-8292-c2d3e4f5a6b7	f4af27a5-e620-41dc-a4b9-5448ce541236	L	\N	\N
ac1b2c3d-1b07-4fbc-8393-d3e4f5a6b7c8	612407d1-5650-494b-8518-eb9a8a084422	XL	\N	\N
bd2c3d4e-2c18-4fcd-8494-e4f5a6b7c8d9	612407d1-5650-494b-8518-eb9a8a084422	L	\N	\N
ce3d4e5f-3d29-4fde-8595-f5a6b7c8d9ea	612407d1-5650-494b-8518-eb9a8a084422	M	\N	\N
df4e5f60-4e3a-4fef-8696-a6b7c8d9ea0b	612407d1-5650-494b-8518-eb9a8a084422	XXL	\N	\N
e05f6171-5f4b-50f0-8797-b7c8d9ea0b1c	21f78d0a-0f63-4523-8f4e-158e0a9b93fe	M	\N	\N
f16f7282-6f5c-50f1-8898-c8d9ea0b1c2d	21f78d0a-0f63-4523-8f4e-158e0a9b93fe	L	\N	\N
a27f8393-7f6d-50f2-8999-d9ea0b1c2d3e	21f78d0a-0f63-4523-8f4e-158e0a9b93fe	S	\N	\N
b38f94a4-8f7e-50f3-8a9a-ea0b1c2d3e4f	21f78d0a-0f63-4523-8f4e-158e0a9b93fe	XXL	\N	\N
c49fa5b5-9f8f-50f4-8bab-f0b1c2d3e4f5	76d129dc-8bd9-4875-879d-6e960ea3ee02	M	\N	\N
d5afb6c6-af90-50f5-8cbc-1b2c3d4e5f6a	76d129dc-8bd9-4875-879d-6e960ea3ee02	XXL	\N	\N
\.


--
-- TOC entry 5263 (class 0 OID 16439)
-- Dependencies: 224
-- Data for Name: payment_service_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payment_service_user (user_id, payment_service_user_id, created_at, modified_at) FROM stdin;
\.


--
-- TOC entry 5256 (class 0 OID 16388)
-- Dependencies: 217
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, email, first_name, last_name, phone, gender, dob, is_verified, is_subscribed, is_body_scanned, is_face_scanned, created_at, modified_at) FROM stdin;
\.


--
-- TOC entry 5259 (class 0 OID 16411)
-- Dependencies: 220
-- Data for Name: user_body_image; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_body_image (user_id, body_image, created_at, modified_at, recommended_size, recommended_colors, recommended_shirts) FROM stdin;
\.


--
-- TOC entry 5257 (class 0 OID 16397)
-- Dependencies: 218
-- Data for Name: user_body_matrix; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_body_matrix (user_id, body_matrix, created_at, modified_at) FROM stdin;
\.


--
-- TOC entry 5261 (class 0 OID 16425)
-- Dependencies: 222
-- Data for Name: user_credential; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_credential (user_email, password_hash, created_at, modified_at) FROM stdin;
\.


--
-- TOC entry 5260 (class 0 OID 16418)
-- Dependencies: 221
-- Data for Name: user_face_image; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_face_image (user_id, face_image, created_at, modified_at) FROM stdin;
\.


--
-- TOC entry 5258 (class 0 OID 16404)
-- Dependencies: 219
-- Data for Name: user_face_matrix; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_face_matrix (user_id, face_matrix, created_at, modified_at) FROM stdin;
\.


--
-- TOC entry 5272 (class 0 OID 16502)
-- Dependencies: 233
-- Data for Name: user_otp; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_otp (id, user_email, otp_hash, created_at, modified_at) FROM stdin;
\.


--
-- TOC entry 5262 (class 0 OID 16432)
-- Dependencies: 223
-- Data for Name: user_subscription; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_subscription (user_id, subscription_plan_id, subscription_id, created_at, modified_at) FROM stdin;
\.


-- Completed on 2025-03-14 02:01:15

--
-- PostgreSQL database dump complete
--


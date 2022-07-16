--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.4

-- Started on 2022-07-16 23:21:09

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3354 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 209 (class 1259 OID 16419)
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profiles (
    id integer NOT NULL,
    iduser integer NOT NULL,
    fullname character varying(255),
    balance numeric DEFAULT 0,
    picture character varying(255),
    phonenumber character varying(20)
);


ALTER TABLE public.profiles OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16424)
-- Name: profile_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.profiles ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.profile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 211 (class 1259 OID 16425)
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    id integer NOT NULL,
    notes text,
    recipient_id integer,
    sender_id integer,
    amount numeric NOT NULL,
    "time" timestamp without time zone NOT NULL,
    type_id integer NOT NULL
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16430)
-- Name: transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.transactions ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.transaction_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 213 (class 1259 OID 16431)
-- Name: transactiontype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactiontype (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying
);


ALTER TABLE public.transactiontype OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16436)
-- Name: transaction_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.transactiontype ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.transaction_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 215 (class 1259 OID 16437)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    pin character varying(6)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16442)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3341 (class 0 OID 16419)
-- Dependencies: 209
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profiles (id, iduser, fullname, balance, picture, phonenumber) FROM stdin;
40	13	joko nyoba upload	200	1657201260025.webp	081233336633
43	27	joni	1000	\N	081122223333
42	26	regis3	4900	\N	081299998888
45	37	regis 5 updated	1000	1657598654821.webp	081122224444
46	38	regis 7 updated	-100	1657606336128.webp	081122227777
47	39	coba123	1900	1657610500977.webp	08123131313131
44	36	\N	500	\N	\N
39	14	coba123	0	1657201194123.webp	081233336666
\.


--
-- TOC entry 3343 (class 0 OID 16425)
-- Dependencies: 211
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transactions (id, notes, recipient_id, sender_id, amount, "time", type_id) FROM stdin;
28	\N	\N	5	100000	2022-07-05 06:18:50.352	7
29	\N	\N	7	100000	2022-07-05 06:20:07.398	7
30	\N	\N	7	100000	2022-07-05 08:49:49.564	7
45	\N	26	23	100000	2022-07-11 14:07:13.267	7
46	dadada	26	23	100000	2022-07-11 14:49:55.868	7
47	a	26	26	100	2022-07-11 15:36:24.509	7
48	a	26	26	100	2022-07-11 16:07:37.791	7
49	a	26	26	100	2022-07-11 16:08:02.695	7
50	a	26	26	100	2022-07-11 16:09:03.921	7
51	a	26	26	100	2022-07-11 16:09:46.982	7
52	a	26	26	100	2022-07-11 16:10:12.708	7
53	a	26	26	100	2022-07-11 16:10:53.605	7
54	a	26	26	100	2022-07-11 16:15:31.053	7
55	a	26	26	100	2022-07-11 16:16:39.76	7
56	a	26	26	100	2022-07-11 16:19:52.187	7
61	a	26	26	100	2022-07-11 16:49:09.258	7
62	a	13	26	100	2022-07-11 16:50:57.609	7
63	a	13	26	100	2022-07-11 16:53:15.181	7
64	a	13	26	100	2022-07-11 16:53:37.4	7
65	a	13	26	100	2022-07-11 16:57:28.71	7
66	a	13	26	100	2022-07-11 16:59:04.092	7
72	a	13	26	100	2022-07-11 17:09:10.545	7
74	a	13	26	100	2022-07-11 17:11:54.034	7
75	a	13	26	100	2022-07-11 17:12:27.289	7
76	a	13	26	100	2022-07-11 17:12:41.486	7
77	a	13	26	100	2022-07-11 17:13:31.607	7
78	a	13	26	100	2022-07-11 17:14:20.208	7
79	a	13	26	100	2022-07-11 17:14:58.601	7
80	a	13	26	100	2022-07-11 17:15:21.753	7
81	a	13	26	100	2022-07-11 17:16:20.566	7
82	a	13	26	100	2022-07-11 17:16:58.367	7
83	a	13	26	100	2022-07-11 17:17:39.578	7
84	a	36	37	100	2022-07-12 10:59:55.221	7
85	a	36	38	100	2022-07-12 13:00:15.509	7
86	a	36	39	100	2022-07-12 14:20:00.308	7
89	a	36	39	100	2022-07-16 22:15:41.098	7
90	a	36	39	100	2022-07-16 22:26:42.14	7
\.


--
-- TOC entry 3345 (class 0 OID 16431)
-- Dependencies: 213
-- Data for Name: transactiontype; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transactiontype (id, name, description) FROM stdin;
7	topup bca	dari bank
13	topup bni	coba
\.


--
-- TOC entry 3347 (class 0 OID 16437)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, pin) FROM stdin;
5	user2	user2@mail.com	1234	123456
7	user3	user3@mail.com	$2b$10$Kn9AR4Dy7QuQwtjffgDAe.M2v52n3JZUuxc.aVJFqrMiGvjZrlTn6	123456
8	user4	user4@mail.com	$2b$10$16jDaeBJFUxb0Y9ctHG.rOYABJa4wrxLEzT2qDlLZlCsV7E2Qr2je	123456
9	danila	budi.dan@gmail.com	$2b$10$jaiLu1Fzc65p67SVi9XX4eGs7IkjkTygH3sbKA38LTtpPtTApvRpW	123456
11	budd	budi@gmail.com	$2b$10$qrRjaWpOmmBLmNb7mkq3AusFsKCgttIzBVwgByiv5ZTih883l7dFq	123456
13	budia	budia@gmail.com	$2b$10$D282D5nFcZXdhXc.svd8COecQcVNW52t56j5KB/qhdQ7kYRxmXe/e	12345
14	budiaa	budiaa@gmail.com	$2b$10$45nMT90fo/qbzLR6w29c4usnOTHQjPCZaUw1fp.2tXbRsexUkPnjO	12345a
15	budiaaa	budiaaa@gmail.com	$2b$10$UJtK2G531wMTOeD7xakAAun2ilxx4QwKYB2ApaCAMGGYT./spE3Hi	12345
16	budiaaaaa	budiaaaaa@gmail.com	$2b$10$jCJ8cqGC7Qh2Nmy9JBqTHObNd7ATyUzs8XDGK0sric.rfi0/AkqYm	123456
19	nyoba ab	nyobaab@gmail.com	$2b$10$tcI98tGKj9hYg1R/IUmjA.wxXiFBO7M8f73H3p8Aor61aOu/L30F.	123456
23	regis2	regis2@mail.com	$2b$10$beBBhy7v9ea4.Wgo/5OFceVfGoej7iFOrVWRupD9dMAqwsgVVIYX6	123456
20	regis1	regis1@mail.com	1234	123456
27	regis4	regis4@mail.com	87654321	\N
26	regis3	regis3@mail.com	$2b$10$.9728b3c3NfBbF3.UeHN5OLbrCQYKJY7NpmmLPSdVKDGvYsRQXhRK	654321
36	regis5	regis5@mail.com	$2b$10$9QoubsvaWtg6RfuVG.oVn.FJ/Ro6SVO4CZ8aHwhe/9NOpV8rT7tMC	\N
37	regis6	regis6@mail.com	$2b$10$HAl8ItPBeDuProRwt4Gq4e8koAjf6XlHRqSwZOh4pDW.W2YhfcLoO	654321
38	regis7	regis7@mail.com	$2b$10$EcC/tCfzc04P4xEcA.WRu.JXGIp6Z5bdQoF5QzCAn4No15gY.UH1W	654321
39	regis8	regis8@mail.com	$2b$10$NEH/G0zwuYGGobep55nUHuT.sgk7ahzEVJpxOeolQIeSOeaPeoUmy	654321
\.


--
-- TOC entry 3355 (class 0 OID 0)
-- Dependencies: 210
-- Name: profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profile_id_seq', 47, true);


--
-- TOC entry 3356 (class 0 OID 0)
-- Dependencies: 212
-- Name: transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_id_seq', 90, true);


--
-- TOC entry 3357 (class 0 OID 0)
-- Dependencies: 214
-- Name: transaction_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_type_id_seq', 16, true);


--
-- TOC entry 3358 (class 0 OID 0)
-- Dependencies: 216
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 39, true);


--
-- TOC entry 3193 (class 2606 OID 16444)
-- Name: users email_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT email_un UNIQUE (email);


--
-- TOC entry 3181 (class 2606 OID 16446)
-- Name: profiles iduser_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT iduser_un UNIQUE (iduser);


--
-- TOC entry 3189 (class 2606 OID 16448)
-- Name: transactiontype name_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactiontype
    ADD CONSTRAINT name_un UNIQUE (name);


--
-- TOC entry 3183 (class 2606 OID 16450)
-- Name: profiles phone_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT phone_un UNIQUE (phonenumber);


--
-- TOC entry 3185 (class 2606 OID 16452)
-- Name: profiles profiles_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pk PRIMARY KEY (id);


--
-- TOC entry 3187 (class 2606 OID 16454)
-- Name: transactions transactions_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pk PRIMARY KEY (id);


--
-- TOC entry 3191 (class 2606 OID 16456)
-- Name: transactiontype transactiontype_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactiontype
    ADD CONSTRAINT transactiontype_pk PRIMARY KEY (id);


--
-- TOC entry 3195 (class 2606 OID 16458)
-- Name: users username_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT username_un UNIQUE (username);


--
-- TOC entry 3197 (class 2606 OID 16460)
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- TOC entry 3198 (class 2606 OID 16555)
-- Name: profiles profiles_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_fk FOREIGN KEY (iduser) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3199 (class 2606 OID 16560)
-- Name: transactions transactions_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_fk FOREIGN KEY (recipient_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- TOC entry 3200 (class 2606 OID 16565)
-- Name: transactions transactions_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_fk_1 FOREIGN KEY (sender_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- TOC entry 3201 (class 2606 OID 16570)
-- Name: transactions transactions_to_trans_type; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_to_trans_type FOREIGN KEY (type_id) REFERENCES public.transactiontype(id) ON DELETE SET NULL;


-- Completed on 2022-07-16 23:21:10

--
-- PostgreSQL database dump complete
--


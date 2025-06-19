--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9
-- Dumped by pg_dump version 16.9

-- Started on 2025-06-18 00:05:48

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16490)
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admins (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password_hash text NOT NULL
);


ALTER TABLE public.admins OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16489)
-- Name: admins_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admins_id_seq OWNER TO postgres;

--
-- TOC entry 4820 (class 0 OID 0)
-- Dependencies: 219
-- Name: admins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admins_id_seq OWNED BY public.admins.id;


--
-- TOC entry 222 (class 1259 OID 16521)
-- Name: sources; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sources (
    id integer NOT NULL,
    title character varying(255) NOT NULL
);


ALTER TABLE public.sources OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16520)
-- Name: sources_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sources_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sources_id_seq OWNER TO postgres;

--
-- TOC entry 4821 (class 0 OID 0)
-- Dependencies: 221
-- Name: sources_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sources_id_seq OWNED BY public.sources.id;


--
-- TOC entry 218 (class 1259 OID 16454)
-- Name: surname_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.surname_details (
    id integer NOT NULL,
    surname_id integer NOT NULL,
    detail_key character varying(255) NOT NULL,
    detail_value text NOT NULL
);


ALTER TABLE public.surname_details OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16453)
-- Name: surname_details_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.surname_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.surname_details_id_seq OWNER TO postgres;

--
-- TOC entry 4822 (class 0 OID 0)
-- Dependencies: 217
-- Name: surname_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.surname_details_id_seq OWNED BY public.surname_details.id;


--
-- TOC entry 216 (class 1259 OID 16444)
-- Name: surnames; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.surnames (
    id integer NOT NULL,
    surname text NOT NULL,
    meaning_tuvan text,
    meaning_russian text
);


ALTER TABLE public.surnames OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16443)
-- Name: surnames_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.surnames_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.surnames_id_seq OWNER TO postgres;

--
-- TOC entry 4823 (class 0 OID 0)
-- Dependencies: 215
-- Name: surnames_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.surnames_id_seq OWNED BY public.surnames.id;


--
-- TOC entry 4651 (class 2604 OID 16493)
-- Name: admins id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins ALTER COLUMN id SET DEFAULT nextval('public.admins_id_seq'::regclass);


--
-- TOC entry 4652 (class 2604 OID 16524)
-- Name: sources id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sources ALTER COLUMN id SET DEFAULT nextval('public.sources_id_seq'::regclass);


--
-- TOC entry 4650 (class 2604 OID 16457)
-- Name: surname_details id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.surname_details ALTER COLUMN id SET DEFAULT nextval('public.surname_details_id_seq'::regclass);


--
-- TOC entry 4649 (class 2604 OID 16447)
-- Name: surnames id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.surnames ALTER COLUMN id SET DEFAULT nextval('public.surnames_id_seq'::regclass);


--
-- TOC entry 4812 (class 0 OID 16490)
-- Dependencies: 220
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admins (id, username, password_hash) FROM stdin;
1	admin	$2b$10$NGAxed8iHhORdb7kMVXfVO0hOv0sq2ac6fCITbup6V4T3l9sshWxu
\.


--
-- TOC entry 4814 (class 0 OID 16521)
-- Dependencies: 222
-- Data for Name: sources; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sources (id, title) FROM stdin;
\.


--
-- TOC entry 4810 (class 0 OID 16454)
-- Dependencies: 218
-- Data for Name: surname_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.surname_details (id, surname_id, detail_key, detail_value) FROM stdin;
\.


--
-- TOC entry 4808 (class 0 OID 16444)
-- Dependencies: 216
-- Data for Name: surnames; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.surnames (id, surname, meaning_tuvan, meaning_russian) FROM stdin;
15	Донгак	Тыва аймак ады	Название тувинского рода
16	Монгуш	Тыва аймак ады	Название тувинского рода
17	Хертек	Тыва аймак ады	Название тувинского рода
18	Ооржак	Тыва аймак ады	Название тувинского рода
14	Ак	Тыва аймак ады	Название тувинского народа
19	Сат	Тыва аймак ады	Название тувинского рода
13	Айыжы	Аас-кежиктиң чеди бурганнырның бирээзи	Один из семи будд счастья
\.


--
-- TOC entry 4824 (class 0 OID 0)
-- Dependencies: 219
-- Name: admins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admins_id_seq', 2, true);


--
-- TOC entry 4825 (class 0 OID 0)
-- Dependencies: 221
-- Name: sources_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sources_id_seq', 1, false);


--
-- TOC entry 4826 (class 0 OID 0)
-- Dependencies: 217
-- Name: surname_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.surname_details_id_seq', 1, false);


--
-- TOC entry 4827 (class 0 OID 0)
-- Dependencies: 215
-- Name: surnames_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.surnames_id_seq', 25, true);


--
-- TOC entry 4658 (class 2606 OID 16497)
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);


--
-- TOC entry 4660 (class 2606 OID 16499)
-- Name: admins admins_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key UNIQUE (username);


--
-- TOC entry 4662 (class 2606 OID 16526)
-- Name: sources sources_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sources
    ADD CONSTRAINT sources_pkey PRIMARY KEY (id);


--
-- TOC entry 4656 (class 2606 OID 16461)
-- Name: surname_details surname_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.surname_details
    ADD CONSTRAINT surname_details_pkey PRIMARY KEY (id);


--
-- TOC entry 4654 (class 2606 OID 16451)
-- Name: surnames surnames_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.surnames
    ADD CONSTRAINT surnames_pkey PRIMARY KEY (id);


--
-- TOC entry 4663 (class 2606 OID 16462)
-- Name: surname_details surname_details_surname_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.surname_details
    ADD CONSTRAINT surname_details_surname_id_fkey FOREIGN KEY (surname_id) REFERENCES public.surnames(id) ON DELETE CASCADE;


-- Completed on 2025-06-18 00:05:49

--
-- PostgreSQL database dump complete
--


import { Heading } from "components/Heading";
import { FetchAlertDocument, FetchAlertQuery } from "features/alert/queries/FetchAlert.generated";
import { client } from "lib/apolloClient";
import Link from "next/link";
import { t } from "utils/translations";

export const Alert = async () => {
  const { data } = await client.query<FetchAlertQuery>({
    query: FetchAlertDocument,
  });

  const { content, link, isEnabled } = data.alert?.data?.attributes ?? {};

  if (!isEnabled) {
    return null;
  }

  return (
    <section aria-describedby="announcement">
      <Heading as="h2" id="announcement" className="sr-only">
        {t("announcement")}
      </Heading>
      <p>{link ? <Link href={link}>{content}</Link> : content}</p>
    </section>
  );
};

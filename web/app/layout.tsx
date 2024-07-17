import './global.css';
import { UiLayout } from '@/components/ui/ui-layout';
import { ClusterProvider } from '@/components/cluster/cluster-data-access';
import { SolanaProvider } from '@/components/solana/solana-provider';
import { ReactQueryProvider } from './react-query-provider';

export const metadata = {
  title: 'tooling-data-explorer',
  description: 'A solana blockchain explorer that fetches data from RPC and/or API sources. The UI offers a clear and easy-to-use experience for a broad range of users.',
};

const links: { label: string; path: string }[] = [
  { label: 'Account', path: '/account' },
  { label: 'Clusters', path: '/clusters' },
  /* { label: 'ToolingDataExplorer Program', path: '/tooling-data-explorer' }, */
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
    lang="en"
    style={{ backgroundColor: 'darksalmon', padding: '20px' }}
    >
      <body>
        <ReactQueryProvider>
          <ClusterProvider>
            <SolanaProvider>
              <UiLayout links={links}>{children}</UiLayout>
            </SolanaProvider>
          </ClusterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
